import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Workflow, ClipboardList, MessageSquare } from "lucide-react";
import VideoTestimonials from "@/components/VideoTestimonials";
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header className="mb-4 xs:mb-6 md:mb-10 text-center max-w-3xl mx-auto px-2">
    <h2 className="font-bree text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary mb-2 xs:mb-3 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm xs:text-base md:text-lg text-foreground/80 leading-relaxed">{subtitle}</p>
    )}
  </header>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 md:py-5">
          <nav className="flex items-center justify-between">
            <a href="#hero" aria-label="TechClin - Início" className="flex items-center gap-2 md:gap-3 group">
              <img
                src="/lovable-uploads/c8a83320-7c65-4173-96d2-ba83c08d1f99.png"
                alt="Logo TechClin"
                className="h-6 xs:h-7 md:h-8 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
              <span className="font-bree text-lg xs:text-xl md:text-2xl tracking-tight">TechClin</span>
            </a>
            <div className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm"
                onClick={(e) => { e.preventDefault(); import("@/lib/lead-modal").then(m => m.openLeadModal()); }}
              >
                <span className="hidden md:inline">Agendar consultoria</span>
                <span className="md:hidden">Agendar</span>
                <ArrowRight className="ml-1 md:ml-2 h-4 w-4" />
              </Button>
            </div>

          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute -top-8 xs:-top-16 -right-8 xs:-right-16 w-48 xs:w-72 h-48 xs:h-72 rounded-full bg-accent/20 blur-3xl animate-float" />
          <div className="absolute -bottom-5 xs:-bottom-10 -left-5 xs:-left-10 w-56 xs:w-80 h-56 xs:h-80 rounded-full bg-primary-foreground/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-12 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-block rounded-full bg-primary-foreground/10 text-primary-foreground px-2 xs:px-3 py-1 text-xs xs:text-sm mb-3 xs:mb-4 animate-fade-in" style={{ animationDelay: '0.05s' }}>Consultoria 1:1 exclusiva</p>
              <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bree font-bold tracking-normal md:tracking-wide leading-tight text-primary-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Transforme o atendimento da sua clínica com automação e dados inteligentes
              </h1>
              <p className="text-base xs:text-lg md:text-xl text-primary-foreground/90 mt-3 sm:mt-4 max-w-3xl leading-relaxed mx-auto animate-fade-in px-2" style={{ animationDelay: '0.2s' }}>
                Mapeamento e otimização de processos para clínicas médicas, com fluxos visuais claros e recomendações baseadas em dados reais para decisões estratégicas.
              </p>
              <div className="mt-5 xs:mt-6 md:mt-8 flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 animate-fade-in px-2" style={{ animationDelay: '0.3s' }}>
                <a href="#contato" className="w-full xs:w-auto">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full xs:w-auto text-sm xs:text-base">
                    Agendar consultoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#processo" className="w-full xs:w-auto">
                  <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/20 w-full xs:w-auto text-sm xs:text-base">
                    Como funciona
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimento forte (logo após o Hero) */}
        <section id="depoimentos" className="bg-background">
          <div className="section-container">
            <SectionHeader title="Depoimento em vídeo" subtitle="Veja um exemplo rápido do impacto do trabalho" />
            <VideoTestimonials />
          </div>
        </section>

        {/* Sobre o Consultor */}
        <section id="consultor" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Sobre o Consultor"
              subtitle="Especialista em mapeamento e otimizações de processos, conectando tecnologia, dados e gestão para tornar o atendimento mais eficiente e claro."
            />
            <div className="grid md:grid-cols-2 gap-6 xs:gap-8 items-center">
              <div className="relative order-1 md:order-2 animate-fade-in-right md:justify-self-center md:self-center">
                <div className="aspect-[4/5] w-2/3 xs:w-3/4 sm:w-2/3 md:w-4/5 max-w-[280px] xs:max-w-[320px] md:max-w-[360px] mx-auto rounded-2xl overflow-hidden border border-primary/15 bg-background shadow-elegant hover:-translate-y-1 hover:shadow-elegant-hover transition-all">
                  <img
                    src="/placeholder.svg"
                    alt="Foto do consultor da TechClin"
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                </div>
                <span className="absolute top-2 xs:top-3 left-2 xs:left-3 inline-flex items-center rounded-full bg-accent/20 text-accent px-2 xs:px-3 py-1 text-[10px] xs:text-xs shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>BPMN | Dados | AI</span>
                <div className="absolute -bottom-3 xs:-bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur rounded-full border border-primary/15 px-2 xs:px-3 py-1 text-[10px] xs:text-xs shadow-elegant">Arthur Lima, consultor TechClin</div>
              </div>
              <div className="order-2 md:order-1 space-y-3 xs:space-y-4 animate-fade-in-left text-center md:text-left px-2 xs:px-0">
                <h3 className="font-bree text-lg xs:text-xl md:text-2xl text-primary">Transformando operações com processos claros</h3>
                <p className="text-sm xs:text-base md:text-lg text-foreground/90 leading-relaxed">Arthur, 20 anos, vive no Norte de Portugal estudando Inteligência Artificial e engenharia de software no Instituto Politécnico de Bragança e cursa ADS na CESAR School, referência nacional em TI e inovação. Com experiência em projetos no Porto Digital, maior parque tecnológico do Brasil, integra gestão, dados e automação para gerar eficiência. Além do português, tem conhecimento em inglês e francês.</p>

                <ul className="space-y-2 xs:space-y-3">
                  {[
                    "Experiência em mapeamento e otimização de processos para diferentes áreas de negócios",
                    "Certificações em Inteligência Artificial (Machine Learning e Generative AI)",
                    "Especialista em automações com ferramentas como n8n",
                    "Experiência em gestão de equipes e otimização de fluxos em projetos do Porto Digital",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <CheckCircle className="text-primary shrink-0 mt-0.5 w-4 h-4 xs:w-5 xs:h-5" />
                      <span className="text-sm xs:text-base text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 h-1 w-16 xs:w-24 bg-accent rounded-full animate-fade-in mx-auto md:mx-0" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        </section>


        {/* Como funciona */}
        <section id="processo" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader title="Como funciona" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6">
              {[
                { title: "Reunião detalhada", desc: "Entendimento profundo do funcionamento da clínica e dos fluxos de atendimento dos pacientes.", Icon: Workflow },
                { title: "Relatório e diagnóstico", desc: "Documento completo mostrando o modelo atual, problemas e recomendações práticas para melhorar processos.", Icon: ClipboardList },
                { title: "Soluções personalizadas", desc: "Desenvolvimento de estratégias e ferramentas adaptadas às necessidades da clínica — valores sob consulta.", Icon: MessageSquare },
                { title: "Suporte e acompanhamento", desc: "Apoio contínuo para garantir que as melhorias sejam implementadas e os resultados acompanhados.", Icon: CheckCircle },
              ].map(({ title, desc, Icon }, i) => (
                <article key={title} className={`relative group glass-card p-4 xs:p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant-hover hover:scale-[1.02] hover:rotate-[0.5deg] ${i % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`} style={{ animationDelay: `${0.06 * (i + 1)}s` }}>
                  <div className="absolute -top-2 xs:-top-3 -left-2 xs:-left-3 w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-md animate-pulse-slow">{i + 1}</div>
                  <Icon className="text-primary mb-2 xs:mb-3 w-5 h-5 xs:w-6 xs:h-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-bree text-lg xs:text-xl mb-1 leading-tight">{title}</h3>
                  <p className="text-foreground/80 text-xs xs:text-sm leading-relaxed">{desc}</p>
                  <div className="mt-3 xs:mt-4 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#contato">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Agendar reunião detalhada
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Prova social / Casos de sucesso */}
        <section id="prova-social" className="bg-primary/10">
          <div className="section-container">
            <SectionHeader title="Prova social" subtitle="Resultados e experiências de quem já passou pelo processo" />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: 'Reduzimos o tempo de atendimento em 23% em 60 dias.', author: 'Clínica Vida Plena' },
                { quote: 'O fluxo padronizado eliminou retrabalhos e erros de agenda.', author: 'Instituto Bem Cuidar' },
                { quote: 'Relatório claro, com dados — decisão ficou muito mais fácil.', author: 'Grupo Saúde+ ' },
              ].map((t, i) => (
                <blockquote key={i} className={`glass-card p-6 italic text-foreground/90 border border-primary/15 ${i % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`} style={{ animationDelay: `${0.06 * (i + 1)}s` }}>
                  “{t.quote}”
                  <footer className="not-italic mt-3 text-sm text-foreground/70">— {t.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Relatório TechClin: Mapeamento e Diagnóstico BPMN */}
        <section id="sobre" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Relatório TechClin: Mapeamento e Diagnóstico BPMN"
              subtitle="Entenda com clareza como sua clínica funciona hoje e tenha um plano de ação baseado em dados reais."
            />
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 animate-fade-in-left text-center md:text-left mx-auto md:mx-0">
                <span className="inline-block rounded-full bg-accent/15 text-accent px-3 py-1 text-xs mx-auto md:mx-0">BPMN + Dados Reais</span>
                <h3 className="font-bree text-2xl">O que você recebe</h3>
                <ul className="space-y-3 mx-auto md:mx-0 max-w-md md:max-w-none text-center md:text-left">
                  {[
                    "Mapeamento completo do fluxo do paciente em BPMN (AS-IS)",
                    "Problemas e gargalos identificados com evidências",
                    "Recomendações de automação e melhorias priorizadas (TO-BE)",
                    "Métricas e dados reais que comprovam o impacto esperado",
                    "Versão legível para quem não conhece BPMN (resumo executivo)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 mx-auto md:mx-0">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground/70 bg-background/60 rounded-lg p-3 border border-primary/10 mx-auto md:mx-0 max-w-md md:max-w-none text-center md:text-left">
                  Sem conhecimento em fluxos? Você recebe uma explicação clara e visual junto com uma descrição legível,
                  sem jargões, para toda a equipe entender.
                </p>
              </div>
              <div className="relative animate-fade-in-right mx-auto md:mx-0">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-primary/20 bg-background shadow-elegant">
                  <img
                    src="/bpmn.png"
                    alt="Exemplo de diagrama BPMN do mapeamento de processos da clínica"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href="#contato">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/20">
                  Quero receber o relatório
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Por que nosso relatório funciona */}
        <section id="bpmn" className="bg-primary/5">
          <div className="section-container">
            <SectionHeader
              title="Por que nosso relatório funciona"
              subtitle="Da captura do processo até recomendações acionáveis — tudo com base em evidências."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <article className="glass-card p-6 hover-lift animate-fade-in-left" style={{ animationDelay: '0.05s' }}>
                <Workflow className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Mapeamento completo (BPMN)</h3>
                <p className="text-foreground/80">Documentação visual do estado atual, incluindo o fluxo do paciente e todas as áreas envolvidas.</p>
              </article>
              <article className="glass-card p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <ClipboardList className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Diagnóstico com dados</h3>
                <p className="text-foreground/80">Gargalos e problemas priorizados com métricas e evidências que embasam as decisões.</p>
              </article>
              <article className="glass-card p-6 hover-lift animate-fade-in-right" style={{ animationDelay: '0.25s' }}>
                <CheckCircle className="text-primary mb-3" />
                <h3 className="font-bree text-xl mb-2">Plano de ação</h3>
                <p className="text-foreground/80">Recomendações claras (TO-BE), próximos passos e impacto esperado por iniciativa.</p>
              </article>
            </div>
            <div className="mt-6 text-center">
              <a href="#contato">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Solicitar amostra do relatório
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
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
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in-left" style={{ animationDelay: '0.05s' }}>
                <h4 className="font-bree text-lg mb-1">Integrações com WhatsApp</h4>
                <p className="text-foreground/80">Automatize confirmações, agendamentos e lembretes integrando com o fluxo da sua recepção.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <h4 className="font-bree text-lg mb-1">Pequenas automações</h4>
                <p className="text-foreground/80">Reduza tarefas repetitivas com automações que conectam sistemas já utilizados pela sua equipe.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="feature-card bg-primary/5 border border-primary/15 hover:shadow-elegant-hover hover:-translate-y-1 transition-all animate-fade-in-right" style={{ animationDelay: '0.25s' }}>
                <h4 className="font-bree text-lg mb-1">Aplicações específicas</h4>
                <p className="text-foreground/80">Desenvolvimento de soluções sob medida para necessidades muito específicas da sua operação.</p>
                <div className="mt-3 h-1 w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
            <p className="text-center text-sm text-foreground/70 mt-4">Todos os valores são personalizados conforme o escopo.</p>
            <div className="mt-6 text-center">
              <a href="#contato">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Solicitar proposta
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Problemas que resolvemos */}
        <section id="problemas" className="bg-primary/10">
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
                <li key={i} className={`flex items-start gap-3 bg-primary/5 rounded-xl p-4 border border-primary/10 hover:-translate-y-1 hover:shadow-elegant-hover transition-all ${(i % 2 === 0) ? 'animate-fade-in-left' : 'animate-fade-in-right'}`} style={{ animationDelay: `${0.04 * (i + 1)}s` }}>
                  <CheckCircle className="text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <a href="#contato">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/20">
                  Quero resolver esses problemas
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>


        {/* CTA Final */}
        <section id="contato" className="bg-primary text-primary-foreground">
          <div className="section-container text-center">
            <h2 className="font-bree text-2xl xs:text-3xl md:text-4xl mb-2 leading-tight">Pronto para dar o próximo passo?</h2>
            <p className="text-sm xs:text-base text-primary-foreground/90 mb-4 xs:mb-6 px-2">Agende sua consultoria e receba um diagnóstico claro com recomendações práticas.</p>
            <div>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full xs:w-auto text-sm xs:text-base"
                onClick={(e) => { e.preventDefault(); import("@/lib/lead-modal").then(m => m.openLeadModal()); }}
              >
                Agendar consultoria por e-mail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
