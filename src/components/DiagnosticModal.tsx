import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DiagnosticModal: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ 
    nome: "", 
    email: "", 
    telefone: "",
    countryCode: "+55"
  });

  const WEBHOOK_URL = "https://techhclinic.app.n8n.cloud/webhook/diagnostic-leads";

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-diagnostic-modal", handler as EventListener);
    return () => window.removeEventListener("open-diagnostic-modal", handler as EventListener);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      // Remove tudo que não é número
      let digits = value.replace(/\D/g, "");

      // Limita a 11 dígitos (2 do DDD + 9 do número)
      if (digits.length > 11) digits = digits.slice(0, 11);

      // Formata: (DD) 99999-9999
      if (digits.length <= 2) digits = `(${digits}`;
      else if (digits.length <= 7)
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      else
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

      setForm((f) => ({ ...f, [name]: digits }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.nome.trim()) return "Por favor, informe seu nome completo.";
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(form.email);
    if (!emailOk) return "E-mail inválido.";
    const digits = form.telefone.replace(/\D/g, "");
    if (digits.length < 10) return "Informe um telefone válido (com DDD).";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast({ title: "Verifique os dados", description: error, variant: "destructive" });
      return;
    }
    try {
      setLoading(true);

      const fullPhone = form.countryCode + form.telefone.replace(/\D/g, "");

      // Salvar no Supabase
      const leadPayload = {
        nome: form.nome,
        email: form.email,
        telefone: fullPhone,
        nome_clinica: null,
        origem: 'diagnostico',
        dados_calculadora: null,
        resultado_calculadora: null
      };

      const { error: supabaseError } = await supabase
        .from('leads')
        .insert(leadPayload);

      if (supabaseError && !supabaseError.message.includes('duplicate key')) {
        throw new Error(supabaseError.message);
      }

      // Enviar para webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          telefone: fullPhone,
          tipo: "diagnostic"
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar para o webhook");

      toast({ title: "Diagnóstico agendado!", description: "Entraremos em contato em até 24h para agendar sua videoconferência." });
      setOpen(false);
      setForm({ nome: "", email: "", telefone: "", countryCode: "+55" });

    } catch (err) {
      toast({ title: "Erro ao enviar", description: "Tente novamente em instantes.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl">Diagnóstico Gratuito</DialogTitle>
          <DialogDescription className="text-base">
            Diagnóstico gratuito para identificar onde sua clínica perde eficiência e oportunidades de lucro. 
            Videoconferência prática sem compromisso para mapear gargalos e descobrir melhorias que geram resultados. 
            <strong className="text-accent"> Vagas limitadas a 5 clínicas por semana.</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="nome" className="text-base">Nome completo</Label>
            <Input 
              id="nome" 
              name="nome" 
              value={form.nome} 
              onChange={onChange} 
              placeholder="Ex: Ana Silva" 
              required 
              className="h-12 text-base" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base">E-mail</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={onChange} 
              placeholder="seu@email.com" 
              required 
              className="h-12 text-base" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="telefone" className="text-base">WhatsApp</Label>
            <div className="flex gap-2">
              <Select value={form.countryCode} onValueChange={(value) => setForm(f => ({ ...f, countryCode: value }))}>
                <SelectTrigger className="w-24 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+55">🇧🇷 +55</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+351">🇵🇹 +351</SelectItem>
                  <SelectItem value="+34">🇪🇸 +34</SelectItem>
                  <SelectItem value="+33">🇫🇷 +33</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                id="telefone" 
                name="telefone" 
                type="tel" 
                value={form.telefone} 
                onChange={onChange} 
                placeholder="(11) 91234-5678" 
                required 
                className="h-12 text-base flex-1" 
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="px-6 py-3 text-base"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-base"
            >
              {loading ? "Agendando..." : "Agendar Meu Diagnóstico"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticModal;