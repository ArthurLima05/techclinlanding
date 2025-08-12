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
      // Aqui você pode integrar com Supabase/email/zapier conforme necessidade
      console.log("Lead capturado:", form);
      toast({ title: "Tudo certo!", description: "Recebemos seus dados e entraremos em contato." });
      setOpen(false);
      setForm({ nome: "", email: "", telefone: "" });
    } catch (err) {
      toast({ title: "Erro ao enviar", description: "Tente novamente em instantes.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar consultoria</DialogTitle>
          <DialogDescription>
            Preencha seus dados para que possamos entrar em contato e confirmar sua consultoria.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" name="nome" value={form.nome} onChange={onChange} placeholder="Ex: Ana Silva" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="seu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={onChange} placeholder="(11) 91234-5678" required />
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
          <p className="text-xs text-foreground/70">Seus dados serão usados apenas para contato sobre a consultoria.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
