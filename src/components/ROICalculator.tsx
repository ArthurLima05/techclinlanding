import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ROICalculator = () => {
  const { toast } = useToast();
  const [calculatorData, setCalculatorData] = React.useState({
    atendimentos: "",
    valorConsulta: "",
    numMedicos: "",
    horasRetrabalho: "",
    agendamentosPerdidos: ""
  });

  const [leadData, setLeadData] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    countryCode: "+55",
    nomeClinica: ""
  });

  const [showResult, setShowResult] = React.useState(false);
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasSubmittedLead, setHasSubmittedLead] = React.useState(false);
  const [result, setResult] = React.useState({
    economiaAtendimento: 0,
    economiaRetrabalho: 0,
    economiaAgendamentos: 0,
    economiaTotalMensal: 0,
    economiaAnual: 0,
    roi90Dias: 0,
    tempoRecuperado: 0
  });

  const WEBHOOK_URL = "https://techhclinic.app.n8n.cloud/webhook/roi-calculator-leads";

  // Check if user already submitted lead on component mount
  React.useEffect(() => {
    const leadKey = localStorage.getItem('calculadora_lead_submitted');
    if (leadKey) {
      setHasSubmittedLead(true);
    }
  }, []);

  const calculateROI = () => {
    const atendimentos = Number(calculatorData.atendimentos);
    const valorConsulta = Number(calculatorData.valorConsulta);
    const numMedicos = Number(calculatorData.numMedicos);
    const horasRetrabalho = Number(calculatorData.horasRetrabalho);
    const agendamentosPerdidos = Number(calculatorData.agendamentosPerdidos);

    // Constantes
    const diasUteisMonth = 22;
    const custoHoraEquipe = 35; // R$ por hora média
    const semanasMonth = 4;

    // a) Redução de tempo de atendimento (23%)
    const economiaAtendimento = atendimentos * valorConsulta * diasUteisMonth * 0.23;

    // b) Redução de retrabalho (40%)
    const economiaRetrabalho = horasRetrabalho * custoHoraEquipe * semanasMonth * 0.40;

    // c) Recuperação de agendamentos perdidos (60%)
    const economiaAgendamentos = agendamentosPerdidos * valorConsulta * 0.60;

    // d) Tempo recuperado por semana (40% do retrabalho eliminado)
    const tempoRecuperadoSemana = horasRetrabalho * 0.4;
    
    // e) Economia adicional (otimização de recursos)
    const valorConsultaHora = valorConsulta; // Simplificação: 1 consulta por hora
    const economiaAdicional = tempoRecuperadoSemana * valorConsultaHora * semanasMonth;

    // f) Economia total mensal
    const economiaTotalMensal = economiaAtendimento + economiaRetrabalho + economiaAgendamentos + economiaAdicional;

    // g) Economia anual
    const economiaAnual = economiaTotalMensal * 12;

    // h) ROI em 90 dias (assumindo investimento médio de R$ 8.000)
    const custoSolucao = 8000;
    const economia3Meses = economiaTotalMensal * 3;
    const roi90Dias = (economia3Meses / custoSolucao) * 100;

    setResult({
      economiaAtendimento: Math.round(economiaAtendimento),
      economiaRetrabalho: Math.round(economiaRetrabalho),
      economiaAgendamentos: Math.round(economiaAgendamentos),
      economiaTotalMensal: Math.round(economiaTotalMensal),
      economiaAnual: Math.round(economiaAnual),
      roi90Dias: Math.round(roi90Dias),
      tempoRecuperado: Math.round(tempoRecuperadoSemana)
    });

    setShowResult(true);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const campos = Object.values(calculatorData);
    if (campos.some(campo => !campo || Number(campo) <= 0)) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos com valores válidos.",
        variant: "destructive"
      });
      return;
    }

    calculateROI();

    // Se já enviou lead antes, mostrar resultado direto
    if (hasSubmittedLead) {
      setShowResult(true);
    } else {
      // Se não enviou lead, abrir modal de captura
      setShowLeadModal(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do lead
    if (!leadData.nome || !leadData.email || !leadData.telefone) {
      toast({
        title: "Dados obrigatórios",
        description: "Preencha todos os campos para ver o resultado.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      // Salvar no Supabase
      const leadPayload = {
        nome: leadData.nome,
        email: leadData.email,
        telefone: `${leadData.countryCode}${leadData.telefone}`,
        nome_clinica: leadData.nomeClinica || null,
        origem: 'calculadora',
        dados_calculadora: calculatorData,
        resultado_calculadora: result
      };

      const { error: supabaseError } = await supabase
        .from('leads')
        .insert(leadPayload);

      if (supabaseError && !supabaseError.message.includes('duplicate key')) {
        throw new Error(supabaseError.message);
      }

      // Tentar enviar para webhook (mas não falhar se der erro)
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            telefone: `${leadData.countryCode}${leadData.telefone}`,
            calculatorData,
            result,
            tipo: "roi-calculator"
          }),
        });
      } catch (webhookError) {
        console.log('Webhook error (lead saved in DB):', webhookError);
      }

      // Marcar como enviado no localStorage
      localStorage.setItem('calculadora_lead_submitted', 'true');
      setHasSubmittedLead(true);
      
      // Fechar modal e mostrar resultado
      setShowLeadModal(false);
      setShowResult(true);

      toast({
        title: "Resultado calculado!",
        description: "Confira abaixo o potencial de economia da sua clínica."
      });

    } catch (err) {
      toast({
        title: "Erro ao processar",
        description: "Tente novamente em instantes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculadora" className="bg-primary/5">
      <div className="section-container">
        <header className="mb-6 xs:mb-8 md:mb-12 text-center max-w-4xl mx-auto px-2">
          <h2 className="font-bree text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary mb-3 xs:mb-4 leading-tight">
            Descubra quanto sua clínica pode economizar
          </h2>
          <p className="text-base xs:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Calculadora gratuita de potencial de economia em 2 minutos
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl border border-primary/10 shadow-elegant p-6 xs:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-accent" />
              <h3 className="font-bree text-xl xs:text-2xl">Dados da sua clínica</h3>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="atendimentos" className="text-base">Número de atendimentos por dia</Label>
                  <Input
                    id="atendimentos"
                    type="number"
                    value={calculatorData.atendimentos}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, atendimentos: e.target.value }))}
                    placeholder="Ex: 20"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="valorConsulta" className="text-base">Valor médio por consulta (R$)</Label>
                  <Input
                    id="valorConsulta"
                    type="number"
                    value={calculatorData.valorConsulta}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, valorConsulta: e.target.value }))}
                    placeholder="Ex: 150"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="numMedicos" className="text-base">Quantos médicos trabalham na clínica</Label>
                  <Input
                    id="numMedicos"
                    type="number"
                    value={calculatorData.numMedicos}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, numMedicos: e.target.value }))}
                    placeholder="Ex: 3"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="horasRetrabalho" className="text-base">Horas por semana gastas com retrabalho</Label>
                  <Input
                    id="horasRetrabalho"
                    type="number"
                    value={calculatorData.horasRetrabalho}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, horasRetrabalho: e.target.value }))}
                    placeholder="Ex: 8"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="agendamentosPerdidos" className="text-base">Agendamentos perdidos por mês (estimativa)</Label>
                  <Input
                    id="agendamentosPerdidos"
                    type="number"
                    value={calculatorData.agendamentosPerdidos}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, agendamentosPerdidos: e.target.value }))}
                    placeholder="Ex: 15"
                    required
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="text-center">
                <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calcular Minha Economia
                </Button>
              </div>
            </form>

            {/* Resultado */}
            {showResult && (
              <div className="mt-8 pt-8 border-t border-primary/10">
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
                  <h4 className="font-bree text-xl xs:text-2xl mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    Seu potencial de economia
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-primary/10">
                      <div className="text-2xl xs:text-3xl font-bree text-accent mb-1">
                        R$ {result.economiaTotalMensal.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-foreground/70">Economia mensal</div>
                    </div>
                    
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-primary/10">
                      <div className="text-2xl xs:text-3xl font-bree text-primary mb-1">
                        R$ {result.economiaAnual.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-foreground/70">Economia anual</div>
                    </div>
                    
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-accent" />
                        <div className="text-xl xs:text-2xl font-bree text-accent">
                          {result.roi90Dias}%
                        </div>
                      </div>
                      <div className="text-sm text-foreground/70">ROI em 90 dias</div>
                    </div>
                    
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <div className="text-xl xs:text-2xl font-bree text-primary">
                          {result.tempoRecuperado}h
                        </div>
                      </div>
                      <div className="text-sm text-foreground/70">Tempo recuperado/semana</div>
                    </div>
                  </div>

                   <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/20">
                     <p className="text-sm xs:text-base text-foreground font-medium text-center leading-relaxed">
                       <strong className="text-primary">O custo da inação:</strong> Clínicas que postergam otimizações perdem, em média, 
                       <span className="font-bree text-accent"> 25-35% do potencial de receita anual</span>
                     </p>
                   </div>
                </div>
              </div>
            )}

            {/* Modal de Lead */}
            <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-bree text-xl text-center">
                    Ver Resultado da Calculadora
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="nome-modal" className="text-base">Nome completo</Label>
                    <Input
                      id="nome-modal"
                      value={leadData.nome}
                      onChange={(e) => setLeadData(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Seu nome completo"
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email-modal" className="text-base">Email</Label>
                    <Input
                      id="email-modal"
                      type="email"
                      value={leadData.email}
                      onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="telefone-modal" className="text-base">Telefone/WhatsApp</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={leadData.countryCode} 
                        onValueChange={(value) => setLeadData(prev => ({ ...prev, countryCode: value }))}
                      >
                        <SelectTrigger className="w-20 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+55">🇧🇷 +55</SelectItem>
                          <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          <SelectItem value="+34">🇪🇸 +34</SelectItem>
                          <SelectItem value="+39">🇮🇹 +39</SelectItem>
                          <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="telefone-modal"
                        value={leadData.telefone}
                        onChange={(e) => setLeadData(prev => ({ ...prev, telefone: e.target.value }))}
                        placeholder="(11) 91234-5678"
                        required
                        className="h-12 text-base flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="clinica-modal" className="text-base">Nome da clínica (opcional)</Label>
                    <Input
                      id="clinica-modal"
                      value={leadData.nomeClinica}
                      onChange={(e) => setLeadData(prev => ({ ...prev, nomeClinica: e.target.value }))}
                      placeholder="Nome da sua clínica"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      size="lg" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      {loading ? "Processando..." : "Ver Meu Resultado"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;