
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <img
                src="/lovable-uploads/c8a83320-7c65-4173-96d2-ba83c08d1f99.png"
                alt="Logo TechClin"
                className="h-7 w-auto md:h-8 drop-shadow-sm"
                loading="lazy"
                decoding="async"
              />
              <p className="font-bree text-lg md:text-xl">TechClin</p>
            </div>
            <p className="text-sm opacity-90">Soluções Tech em Clínicas de Sáude</p>
          </div>
          <div className="text-sm space-y-1 text-center md:text-right">
            <p>
              Contato: <a href="mailto:techclin.tech@gmail.com" className="underline hover:opacity-90">techclin.tech@gmail.com</a>
            </p>
            <p>
              WhatsApp: <a href="https://contate.me/558132991184" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">+55 81 3299-1184</a>
            </p>
            <p className="opacity-80">© {new Date().getFullYear()} TechClin. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
