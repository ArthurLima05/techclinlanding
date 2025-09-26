import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";
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
    nomeClinica: "",
    countryCode: "+55"
  });

  const [showResult, setShowResult] = React.useState(false);
  const [showLeadForm, setShowLeadForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  
  // Check if lead already exists in localStorage
  React.useEffect(() => {
    const savedLead = localStorage.getItem('roi_lead_submitted');
    if (savedLead) {
      const leadInfo = JSON.parse(savedLead);
      setLeadData(leadInfo);
      setShowLeadForm(false);
    }
  }, []);

  // Validate if user can proceed to calculation
  const isLeadFormValid = leadData.nome && leadData.email && leadData.telefone;

  // Check if lead exists in database
  const checkExistingLead = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('roi_leads')
        .select('id')
        .eq('email', email)
        .single();
      
      return !error && data;
    } catch (err) {
      return false;
    }
  };

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

    // d) Economia adicional (otimização de recursos)
    const tempoRecuperadoSemana = horasRetrabalho * 0.4; // 40% do retrabalho eliminado
    const valorConsultaHora = valorConsulta; // Simplificação: 1 consulta por hora
    const economiaAdicional = tempoRecuperadoSemana * valorConsultaHora * semanasMonth;

    // e) Economia total mensal
    const economiaTotalMensal = economiaAtendimento + economiaRetrabalho + economiaAgendamentos + economiaAdicional;

    // f) Economia anual
    const economiaAnual = economiaTotalMensal * 12;

    // g) ROI em 90 dias (assumindo investimento médio de R$ 8.000)
    const custoSolucao = 8000;
    const economia3Meses = economiaTotalMensal * 3;
    const roi90Dias = (economia3Meses / custoSolucao) * 100;

    // h) Tempo recuperado por semana
    const tempoRecuperadoPorSemana = horasRetrabalho * 0.4; // 40% do retrabalho eliminado

    setResult({
      economiaAtendimento: Math.round(economiaAtendimento),
      economiaRetrabalho: Math.round(economiaRetrabalho),
      economiaAgendamentos: Math.round(economiaAgendamentos),
      economiaTotalMensal: Math.round(economiaTotalMensal),
      economiaAnual: Math.round(economiaAnual),
      roi90Dias: Math.round(roi90Dias),
      tempoRecuperado: Math.round(tempoRecuperadoPorSemana * 10) / 10 // 1 decimal place
    });

    setShowResult(true);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos dados da calculadora
    const campos = Object.values(calculatorData);
    if (campos.some(campo => !campo || Number(campo) <= 0)) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos com valores válidos.",
        variant: "destructive"
      });
      return;
    }

    // Validação dos dados de lead
    if (!isLeadFormValid) {
      toast({
        title: "Dados de contato obrigatórios",
        description: "Preencha nome, email e WhatsApp para ver o resultado.",
        variant: "destructive"
      });
      return;
    }

    calculateROI();
    setShowResult(true);
  };

  const handleLeadSubmit = async () => {
    try {
      setLoading(true);

      // Check if email already exists
      const existingLead = await checkExistingLead(leadData.email);
      
      if (!existingLead) {
        // Save to Supabase
        const { error: supabaseError } = await supabase
          .from('roi_leads')
          .insert({
            name: leadData.nome,
            email: leadData.email,
            whatsapp: `${leadData.countryCode}${leadData.telefone}`,
            clinic_name: leadData.nomeClinica,
            calculator_data: calculatorData,
            result: result
          });

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
        }
      }

      // Send to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          whatsapp: `${leadData.countryCode}${leadData.telefone}`,
          calculatorData,
          result,
          tipo: "roi-calculator"
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      // Save to localStorage to prevent repeated submissions
      localStorage.setItem('roi_lead_submitted', JSON.stringify(leadData));

      toast({
        title: "Cálculo enviado!",
        description: "Você receberá o relatório detalhado por email em até 1 hora."
      });

      setShowLeadForm(false);

    } catch (err) {
      toast({
        title: "Erro ao enviar",
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
              {/* Lead Form - Show first if not filled */}
              {!isLeadFormValid && (
                <div className="bg-accent/10 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-accent" />
                    <h4 className="font-bree text-xl">Seus dados para o resultado</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="nome-lead" className="text-base">Nome completo *</Label>
                      <Input
                        id="nome-lead"
                        value={leadData.nome}
                        onChange={(e) => setLeadData(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Seu nome completo"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email-lead" className="text-base">Email *</Label>
                      <Input
                        id="email-lead"
                        type="email"
                        value={leadData.email}
                        onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="telefone-lead" className="text-base">WhatsApp *</Label>
                      <div className="flex gap-2">
                        <Select value={leadData.countryCode} onValueChange={(value) => setLeadData(prev => ({ ...prev, countryCode: value }))}>
                          <SelectTrigger className="w-24 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+55">🇧🇷 +55</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                            <SelectItem value="+54">🇦🇷 +54</SelectItem>
                            <SelectItem value="+56">🇨🇱 +56</SelectItem>
                            <SelectItem value="+57">🇨🇴 +57</SelectItem>
                            <SelectItem value="+351">🇵🇹 +351</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="telefone-lead"
                          value={leadData.telefone}
                          onChange={(e) => setLeadData(prev => ({ ...prev, telefone: e.target.value }))}
                          placeholder="91234-5678"
                          required
                          className="h-12 text-base flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="clinica-lead" className="text-base">Nome da clínica</Label>
                      <Input
                        id="clinica-lead"
                        value={leadData.nomeClinica}
                        onChange={(e) => setLeadData(prev => ({ ...prev, nomeClinica: e.target.value }))}
                        placeholder="Nome da sua clínica"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Calculator Fields */}
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
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={!isLeadFormValid}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calcular Minha Economia
                </Button>
                {!isLeadFormValid && (
                  <p className="text-sm text-foreground/60 mt-2">
                    Preencha seus dados acima para calcular
                  </p>
                )}
              </div>
            </form>

            {/* Resultado e Lead Form */}
            {showResult && (
              <div className="mt-8 pt-8 border-t border-primary/10">
                <div className="bg-accent/10 rounded-xl p-6 mb-6">
                  <h4 className="font-bree text-xl mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Seu potencial de economia
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-2xl font-bree text-accent">R$ {result.economiaTotalMensal.toLocaleString('pt-BR')}</div>
                      <div className="text-sm text-foreground/70">Economia mensal</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-2xl font-bree text-primary">R$ {result.economiaAnual.toLocaleString('pt-BR')}</div>
                      <div className="text-sm text-foreground/70">Economia anual</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-2xl font-bree text-green-600">{result.roi90Dias}%</div>
                      <div className="text-sm text-foreground/70">ROI em 90 dias</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-2xl font-bree text-blue-600 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        {result.tempoRecuperado}h
                      </div>
                      <div className="text-sm text-foreground/70">Tempo recuperado/semana</div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Button 
                    onClick={handleLeadSubmit} 
                    disabled={loading}
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? "Enviando..." : "Receber Relatório Completo"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;