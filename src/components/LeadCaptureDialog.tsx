import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LeadCaptureDialog: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ nome: "", email: "", telefone: "" });

  // === CONFIGURAR AQUI O WEBHOOK ===
  const WEBHOOK_URL = "https://techclin.app.n8n.cloud/webhook/533755fa-f90f-4d34-aa7d-cbaa7bade7aa"; // substitua pela URL do seu n8n

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-lead-modal", handler as EventListener);
    return () => window.removeEventListener("open-lead-modal", handler as EventListener);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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

      // === ENVIO PARA O WEBHOOK ===
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Erro ao enviar para o webhook");

      toast({ title: "Tudo certo!", description: "Recebemos seus dados e entraremos em contato." });
      setOpen(false);
      setForm({ nome: "", email: "", telefone: "" });

      // Redireciona para página de amostra (opcional)
      window.open("https://www.notion.so/Modelagem-e-Melhoria-de-Processos-Vida-Plena-23d89179d96f8018beb5c50fc4e3b8c0", "_blank");
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
          <DialogTitle className="text-xl">Receber amostra de relatório</DialogTitle>
          <DialogDescription className="text-base">
            Preencha seus dados para receber uma amostra do nosso relatório de mapeamento de processos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="nome" className="text-base">Nome completo</Label>
            <Input id="nome" name="nome" value={form.nome} onChange={onChange} placeholder="Ex: Ana Silva" required className="h-12 text-base" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base">E-mail</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="seu@email.com" required className="h-12 text-base" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="telefone" className="text-base">Telefone</Label>
            <Input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={onChange} placeholder="(11) 91234-5678" required className="h-12 text-base" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="px-6 py-3 text-base">Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-base">
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
