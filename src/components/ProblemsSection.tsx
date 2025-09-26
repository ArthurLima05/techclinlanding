import React from "react";
import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

const ProblemsSection = () => {
  return (
    <section id="problemas" className="bg-primary/10">
      <div className="section-container">
        <header className="mb-6 xs:mb-8 md:mb-12 text-center max-w-4xl mx-auto px-2">
          <h2 className="font-bree text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary mb-3 xs:mb-4 leading-tight">
            Por que 78% das clínicas operam abaixo do potencial de lucratividade?
          </h2>
        </header>

        <div className="grid md:grid-cols-2 gap-8 xs:gap-12 items-center">
          <div className="space-y-6 xs:space-y-8 animate-fade-in-left">
            <div className="space-y-4 xs:space-y-6">
              {[
                {
                  icon: Clock,
                  title: "Processos desorganizados",
                  desc: "Tempo perdido com retrabalho, busca de informações e fluxos mal definidos"
                },
                {
                  icon: TrendingDown,
                  title: "Falta de automação",
                  desc: "Tarefas manuais repetitivas que consomem horas produtivas da equipe"
                },
                {
                  icon: DollarSign,
                  title: "Agendamentos perdidos",
                  desc: "Sem controle eficiente de confirmações, remarcações e no-shows"
                },
                {
                  icon: AlertTriangle,
                  title: "Decisões sem dados",
                  desc: "Falta de métricas claras impede otimizações e crescimento estratégico"
                }
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-4 xs:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 xs:w-7 xs:h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bree text-lg xs:text-xl mb-2 text-foreground">{title}</h3>
                    <p className="text-foreground/80 text-base xs:text-lg leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="aspect-square rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 shadow-elegant">
              <img
                src="/grafico.png"
                alt="Gráfico mostrando problemas comuns em clínicas"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 xs:mt-12 text-center">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 xs:p-8 max-w-4xl mx-auto">
            <p className="text-lg xs:text-xl md:text-2xl font-bree text-accent mb-2">O custo da inação:</p>
            <p className="text-base xs:text-lg text-foreground/90 leading-relaxed">
              Clínicas que postergam otimizações perdem, em média, <strong className="text-accent">25-35% do potencial de receita anual.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;