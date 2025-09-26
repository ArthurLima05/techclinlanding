import React from "react";
import { Shield, CheckCircle, Clock } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section id="garantia" className="bg-primary text-primary-foreground">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-8 h-8 xs:w-10 xs:h-10 text-accent" />
            </div>
          </div>

          <h2 className="font-bree text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary-foreground mb-4 xs:mb-6 leading-tight">
            Garantia Total de Resultados
          </h2>

          <div className="bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 rounded-2xl p-6 xs:p-8 mb-6 xs:mb-8">
            <p className="text-lg xs:text-xl md:text-2xl text-primary-foreground/95 leading-relaxed mb-6">
              Se não identificarmos pelo menos <strong className="text-accent">3 melhorias implementáveis</strong> que geram ROI positivo em 90 dias, 
              <strong className="text-accent"> devolvemos 100% do investimento.</strong>
            </p>
            <p className="text-base xs:text-lg text-primary-foreground/80">
              Primeira reunião sem compromisso - cancele se não enxergar valor claro para sua operação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 xs:gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Garantia de Resultado",
                desc: "Mínimo 3 melhorias identificadas ou dinheiro de volta"
              },
              {
                icon: Clock,
                title: "Sem Compromisso",
                desc: "Primeira reunião gratuita para avaliar o potencial"
              },
              {
                icon: Shield,
                title: "100% Seguro",
                desc: "Reembolso total se não agregar valor real"
              }
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-primary-foreground/5 backdrop-blur rounded-xl p-4 xs:p-6 border border-primary-foreground/10">
                <Icon className="w-8 h-8 text-accent mb-3 mx-auto" />
                <h3 className="font-bree text-lg xs:text-xl mb-2 text-primary-foreground">{title}</h3>
                <p className="text-sm xs:text-base text-primary-foreground/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 xs:mt-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm xs:text-base">
              <Shield className="w-4 h-4" />
              Garantia válida por 90 dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;