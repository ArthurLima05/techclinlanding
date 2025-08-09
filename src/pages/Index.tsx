import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Workflow, ClipboardList, MessageSquare } from "lucide-react";
import VideoTestimonials from "@/components/VideoTestimonials";
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
            <a href="#hero" aria-label="TechClin - Início" className="flex items-center gap-2 md:gap-3 group">
              <img
                src="/lovable-uploads/c8a83320-7c65-4173-96d2-ba83c08d1f99.png"
                alt="Logo TechClin"
                className="h-7 w-auto md:h-8 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
              <span className="font-bree text-xl md:text-2xl tracking-tight">TechClin</span>
            </a>
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
        <section id="hero" className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-float" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl animate-float" style={{animationDelay:'1s'}} />
          <div className="section-container pt-12 md:pt-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-block rounded-full bg-primary-foreground/10 text-primary-foreground px-3 py-1 text-sm mb-4 animate-fade-in" style={{animationDelay: '0.05s'}}>Consultoria 1:1 exclusiva</p>
              <h1 className="section-title text-primary-foreground animate-fade-in" style={{animationDelay: '0.1s'}}>
                Mapeamento e otimização de processos para clínicas médicas
              </h1>
              <p className="section-subtitle text-primary-foreground/90 mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
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
                  <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/20">
                    Como funciona
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Relatório e Mapeamento */}
        <section id="sobre" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Relatório TechClin: Mapeamento e Diagnóstico BPMN"
              subtitle="Entenda com clareza como sua clínica funciona hoje e tenha um plano de ação baseado em dados reais."
            />
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 animate-fade-in-left">
                <span className="inline-block rounded-full bg-accent/15 text-accent px-3 py-1 text-xs">BPMN + Dados Reais</span>
                <h3 className="font-bree text-2xl">O que você recebe</h3>
                <ul className="space-y-3">
                  {[
                    "Mapeamento completo do fluxo do paciente em BPMN (AS-IS)",
                    "Problemas e gargalos identificados com evidências",
                    "Recomendações de automação e melhorias priorizadas (TO-BE)",
                    "Métricas e dados reais que comprovam o impacto esperado",
                    "Versão legível para quem não conhece BPMN (resumo executivo)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground/70 bg-background/60 rounded-lg p-3 border border-primary/10">
                  Sem conhecimento em fluxos? Você recebe uma explicação clara e visual junto com uma descrição legível,
                  sem jargões, para toda a equipe entender.
                </p>
              </div>
              <div className="relative animate-fade-in-right">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-primary/20 bg-background shadow-elegant">
                  <img
                    src="/placeholder.svg"
                    alt="Exemplo de diagrama BPMN do mapeamento de processos da clínica"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-foreground/60 mt-2">Espaço reservado para inserir a imagem do mapeamento (BPMN).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais do Relatório */}
        <section id="bpmn" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Por que nosso relatório funciona"
              subtitle="Da captura do processo até recomendações acionáveis — tudo com base em evidências."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <article className="glass-card p-6 hover-lift animate-fade-in-left" style={{animationDelay: '0.05s'}}>
                <Workflow className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Mapeamento completo (BPMN)</h3>
                <p className="text-foreground/80">Documentação visual do estado atual, incluindo o fluxo do paciente e todas as áreas envolvidas.</p>
              </article>
              <article className="glass-card p-6 hover-lift animate-fade-in" style={{animationDelay: '0.15s'}}>
                <ClipboardList className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Diagnóstico com dados</h3>
                <p className="text-foreground/80">Gargalos e problemas priorizados com métricas e evidências que embasam as decisões.</p>
              </article>
              <article className="glass-card p-6 hover-lift animate-fade-in-right" style={{animationDelay: '0.25s'}}>
                <CheckCircle className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Plano de ação</h3>
                <p className="text-foreground/80">Recomendações claras (TO-BE), próximos passos e impacto esperado por iniciativa.</p>
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
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in-left" style={{animationDelay: '0.05s'}}>
                <h4 className="font-bree text-lg mb-1">Integrações com WhatsApp</h4>
                <p className="text-foreground/80">Automatize confirmações, agendamentos e lembretes integrando com o fluxo da sua recepção.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in" style={{animationDelay: '0.15s'}}>
                <h4 className="font-bree text-lg mb-1">Pequenas automações</h4>
                <p className="text-foreground/80">Reduza tarefas repetitivas com automações que conectam sistemas já utilizados pela sua equipe.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in-right" style={{animationDelay: '0.25s'}}>
                <h4 className="font-bree text-lg mb-1">Aplicações específicas</h4>
                <p className="text-foreground/80">Desenvolvimento de soluções sob medida para necessidades muito específicas da sua operação.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
            <p className="text-center text-sm text-foreground/70 mt-4">Todos os valores são personalizados conforme o escopo.</p>
          </div>
        </section>

        {/* Problemas que resolvemos */}
        <section id="problemas" className="bg-background">
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
                  <li key={i} className={`flex items-start gap-3 bg-primary/5 rounded-xl p-4 border border-primary/10 hover:-translate-y-1 hover:shadow-elegant-hover transition-all ${(i % 2 === 0) ? 'animate-fade-in-left' : 'animate-fade-in-right'}`} style={{animationDelay: `${0.04 * (i+1)}s`}}>
                    <CheckCircle className="text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona o processo */}
        <section id="processo" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader title="Como funciona o processo" />
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Reunião detalhada (BPMN)", desc: "Entendimento profundo do funcionamento da clínica e dos fluxos do paciente.", Icon: Workflow },
                { title: "Relatório e diagnóstico", desc: "Documento com o modelo atual, problemas e recomendações priorizadas.", Icon: ClipboardList },
                { title: "Soluções personalizadas", desc: "Desenvolvimento do que for mais adequado — valores sob consulta.", Icon: MessageSquare },
                { title: "Suporte e acompanhamento", desc: "Apoio contínuo para garantir a adoção e medir resultados.", Icon: CheckCircle },
              ].map(({ title, desc, Icon }, i) => (
                  <article key={title} className={`relative group glass-card p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant-hover hover:scale-[1.02] hover:rotate-[0.5deg] ${i % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`} style={{animationDelay: `${0.06 * (i+1)}s`}}>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-md animate-pulse-slow">{i+1}</div>
                    <Icon className="text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-bree text-xl mb-1">{title}</h3>
                    <p className="text-foreground/80 text-sm">{desc}</p>
                    <div className="mt-4 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
                  </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre o Consultor */}
        <section id="consultor" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Sobre o Consultor"
              subtitle="Especialista em mapeamento de processos (BPMN) e diagnóstico operacional para clínicas."
            />
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="relative order-2 md:order-2 animate-fade-in-right md:justify-self-end">
                <div className="aspect-[4/5] w-2/3 sm:w-1/2 md:w-2/3 max-w-[220px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-primary/15 bg-background shadow-elegant hover:-translate-y-1 hover:shadow-elegant-hover transition-all">
                  <img
                    src="/placeholder.svg"
                    alt="Foto do consultor da TechClin"
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                </div>
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-accent/20 text-accent px-3 py-1 text-xs shadow-sm animate-fade-in" style={{animationDelay:'0.2s'}}>BPMN | Dados | Saúde</span>
              </div>
              <div className="order-1 md:order-1 space-y-4 animate-fade-in-left text-center md:text-left">
                <h3 className="font-bree text-2xl text-primary">Transformando operações com processos claros</h3>
                <p className="text-lg text-foreground/90">Estudante do Instituto Politécnico de Bragança, formado em Análise e Desenvolvimento de Sistemas (ADS) e certificado em Engenharia de Informática. Atua conectando operações, dados e tecnologia para gerar eficiência de ponta a ponta.</p>
                
                <ul className="space-y-3">
                  {[
                    "Mapeamento visual completo (AS-IS) com BPMN",
                    "Diagnóstico com evidências e métricas reais",
                    "Recomendações de melhoria e automações (TO-BE)",
                    "Resumo executivo legível para quem não conhece BPMN",
                  ].map((item, i)=>(
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 h-1 w-24 bg-accent rounded-full animate-fade-in" style={{animationDelay:'0.3s'}} />
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos (opcional) */}
        <section id="depoimentos" className="bg-background">
          <div className="section-container">
            <SectionHeader title="Depoimentos em vídeo" subtitle="Carrossel estático — você poderá inserir vários vídeos depois" />
            <VideoTestimonials />
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
