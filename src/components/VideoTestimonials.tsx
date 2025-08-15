import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { 
    id: 1, 
    quote: "Reduzimos o tempo de atendimento em 23% em 60 dias. O mapeamento de processos mostrou exatamente onde estavam os gargalos.",
    author: "Dr. Carlos Mendes", 
    clinic: "Clínica Vida Plena",
    role: "Diretor Médico",
    rating: 5,
    result: "23% redução no tempo"
  },
  { 
    id: 2, 
    quote: "O fluxo padronizado eliminou retrabalhos e erros de agenda. Nossa equipe agora trabalha de forma mais organizada e eficiente.",
    author: "Ana Beatriz Santos", 
    clinic: "Instituto Bem Cuidar",
    role: "Coordenadora Administrativa",
    rating: 5,
    result: "40% menos erros"
  },
  { 
    id: 3, 
    quote: "Relatório claro, com dados — decisão ficou muito mais fácil. Conseguimos identificar oportunidades que não enxergávamos antes.",
    author: "Dr. Roberto Silva", 
    clinic: "Grupo Saúde+",
    role: "CEO",
    rating: 5,
    result: "15% aumento receita"
  },
  { 
    id: 4, 
    quote: "A automação do WhatsApp reduziu 60% das ligações para confirmação. Nossa recepção agora foca no atendimento presencial.",
    author: "Marina Costa", 
    clinic: "Clínica Integrada",
    role: "Gerente Operacional",
    rating: 5,
    result: "60% menos ligações"
  },
  { 
    id: 5, 
    quote: "O diagnóstico revelou problemas que custavam R$ 15 mil por mês. Em 3 meses já recuperamos o investimento na consultoria.",
    author: "Dr. Felipe Rocha", 
    clinic: "Centro Médico Avançado",
    role: "Sócio-Diretor",
    rating: 5,
    result: "R$ 15k economia/mês"
  }
];

export default function VideoTestimonials() {
  return (
    <div className="w-full animate-fade-in">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="bg-background border border-primary/15 rounded-2xl p-6 md:p-8 shadow-elegant hover:shadow-elegant-hover transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30" />
                </div>
                
                <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-foreground/70">{testimonial.role}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.clinic}</div>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.result}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="relative h-10 w-10 translate-y-0" />
          <CarouselNext className="relative h-10 w-10 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
