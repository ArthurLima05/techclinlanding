import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Workflow, ClipboardList, MessageSquare } from "lucide-react";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header className="mb-6 md:mb-10 text-center max-w-3xl mx-auto">
    <h2 className="font-bree text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-base md:text-lg text-foreground/80">{subtitle}</p>
    )}
  </header>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="section-container py-4 md:py-5">
          <nav className="flex items-center justify-between">
            <a href="#hero" aria-label="TechClin - Início" className="font-bree text-xl md:text-2xl">TechClin</a>
            <a href="#contato" className="hidden md:inline-flex">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Agendar consultoria
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="bg-secondary">
          <div className="section-container pt-10 md:pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-sm mb-4 animate-fade-in" style={{animationDelay: '0.05s'}}>Consultoria 1:1 exclusiva</p>
              <h1 className="section-title text-primary animate-fade-in" style={{animationDelay: '0.1s'}}>
                Mapeamento e otimização de processos para clínicas médicas
              </h1>
              <p className="section-subtitle text-foreground/80 mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
                Relatório personalizado com BPMN e recomendações baseadas em dados reais para decisões estratégicas.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
                <a href="#contato">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Agendar consultoria
                    <ArrowRight className="ml-2" />
                  </Button>
                </a>
                <a href="#processo">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    Como funciona
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre o Consultor */}
        <section id="sobre" className="bg-background">
          <div className="section-container">
            <SectionHeader
              title="Sobre o consultor"
              subtitle="Arthur é especialista em tecnologia e automação para clínicas, com formação em Tecnologia em Portugal."
            />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                <img
                  src="/placeholder.svg"
                  alt="Foto do consultor Arthur, especialista em automação para clínicas"
                  className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover shadow-elegant"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <p className="text-foreground/80">
                  Atuando lado a lado com sua equipe, Arthur mapeia detalhadamente o funcionamento da clínica usando BPMN,
                  compreendendo desde a jornada do paciente até os processos internos administrativos e operacionais.
                </p>
                <p className="text-foreground/80">
                  O resultado é um diagnóstico claro e um plano de ação prático, priorizando ganhos rápidos e melhorias
                  consistentes que geram impactos reais no dia a dia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diferencial TechClin */}
        <section id="bpmn" className="bg-secondary">
          <div className="section-container">
            <SectionHeader
              title="O diferencial TechClin — Mapeamento e Relatório BPMN"
              subtitle="Compreenda o fluxo do paciente e os processos internos em profundidade para tomar decisões com segurança."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <article className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.05s'}}>
                <Workflow className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Mapeamento completo (BPMN)</h3>
                <p className="text-foreground/80">Documentação visual do modelo atual, incluindo o fluxo do paciente e todos os atores envolvidos.</p>
              </article>
              <article className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.15s'}}>
                <ClipboardList className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Relatório personalizado</h3>
                <p className="text-foreground/80">Identificação de gargalos, problemas operacionais e oportunidades de automação fundamentadas em dados reais.</p>
              </article>
              <article className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.25s'}}>
                <CheckCircle className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Recomendações práticas</h3>
                <p className="text-foreground/80">Propostas claras com priorização de impacto, incluindo fluxo otimizado em BPMN e próximos passos.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Soluções Personalizadas */}
        <section id="solucoes" className="bg-background">
          <div className="section-container">
            <SectionHeader
              title="Soluções personalizadas para sua clínica"
              subtitle="Cada empresa é única. Entregamos desde pequenas automações até aplicações sob medida — valores sempre sob consulta."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card bg-white border animate-fade-in" style={{animationDelay: '0.05s'}}>
                <h4 className="font-bree text-lg mb-1">Integrações com WhatsApp</h4>
                <p className="text-foreground/80">Automatize confirmações, agendamentos e lembretes integrando com o fluxo da sua recepção.</p>
              </div>
              <div className="feature-card bg-white border animate-fade-in" style={{animationDelay: '0.15s'}}>
                <h4 className="font-bree text-lg mb-1">Pequenas automações</h4>
                <p className="text-foreground/80">Reduza tarefas repetitivas com automações que conectam sistemas já utilizados pela sua equipe.</p>
              </div>
              <div className="feature-card bg-white border animate-fade-in" style={{animationDelay: '0.25s'}}>
                <h4 className="font-bree text-lg mb-1">Aplicações específicas</h4>
                <p className="text-foreground/80">Desenvolvimento de soluções sob medida para necessidades muito específicas da sua operação.</p>
              </div>
            </div>
            <p className="text-center text-sm text-foreground/70 mt-4">Todos os valores são personalizados conforme o escopo.</p>
          </div>
        </section>

        {/* Problemas que resolvemos */}
        <section id="problemas" className="bg-secondary">
          <div className="section-container">
            <SectionHeader title="Problemas que podemos ajudar a resolver" />
            <ul className="max-w-4xl mx-auto grid md:grid-cols-2 gap-3">
              {[
                "Retrabalho e informações desencontradas entre setores",
                "Falhas na confirmação e no comparecimento de pacientes",
                "Tempo excessivo em tarefas manuais da recepção",
                "Dificuldade de medir indicadores e resultados",
                "Integrações inexistentes ou mal configuradas",
                "Falta de padronização nos processos e comunicação",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border animate-fade-in" style={{animationDelay: `${0.05 * (i+1)}s`}}>
                  <CheckCircle className="text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona o processo */}
        <section id="processo" className="bg-background">
          <div className="section-container">
            <SectionHeader title="Como funciona o processo" />
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Reunião detalhada (BPMN)", desc: "Entendimento profundo do funcionamento da clínica e dos fluxos do paciente.", Icon: Workflow },
                { title: "Relatório e diagnóstico", desc: "Documento com o modelo atual, problemas e recomendações priorizadas.", Icon: ClipboardList },
                { title: "Soluções personalizadas", desc: "Desenvolvimento do que for mais adequado — valores sob consulta.", Icon: MessageSquare },
                { title: "Suporte e acompanhamento", desc: "Apoio contínuo para garantir a adoção e medir resultados.", Icon: CheckCircle },
              ].map(({ title, desc, Icon }, i) => (
                <article key={title} className="glass-card p-6 text-left animate-fade-in" style={{animationDelay: `${0.05 * (i+1)}s`}}>
                  <Icon className="text-primary mb-3" />
                  <h3 className="font-bree text-xl mb-1">{title}</h3>
                  <p className="text-foreground/80 text-sm">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos (opcional) */}
        <section id="depoimentos" className="bg-secondary">
          <div className="section-container">
            <SectionHeader title="Depoimentos" subtitle="O que nossos clientes dizem" />
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[1,2].map((n) => (
                <blockquote key={n} className="bg-white border rounded-xl p-6 animate-fade-in" style={{animationDelay: `${0.1 * n}s`}}>
                  <p className="text-foreground/80 italic">“Conseguimos enxergar claramente nossos gargalos e implementar melhorias rápidas que reduziram o retrabalho.”</p>
                  <footer className="mt-3 text-sm text-foreground/70">Diretora de Clínica — São Paulo</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="contato" className="bg-primary text-primary-foreground">
          <div className="section-container text-center">
            <h2 className="font-bree text-3xl md:text-4xl mb-2">Pronto para dar o próximo passo?</h2>
            <p className="text-primary-foreground/90 mb-6">Agende sua consultoria e receba um diagnóstico claro com recomendações práticas.</p>
            <a href="mailto:contato@techclin.com">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Agendar consultoria por e-mail
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
