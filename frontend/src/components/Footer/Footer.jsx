import React from "react";
import { Mail, Linkedin, MessageSquareText } from "lucide-react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Link unificado para o WhatsApp (ícone e botão)
  const whatsappNumber = "5511946701625";
  const message = encodeURIComponent(
    "Olá! Gostaria de falar com o suporte do Valoriza App.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <footer className="main-footer">
      <div className="footer-inner">
        {/* Lado Esquerdo: Logo e Slogan */}
        <div className="footer-brand">
          <div className="logo-box">
            <img src="../../assets/images/ValorizaApp.png" alt="Valoriza App" />
          </div>
          <p>Mais controle. Mais clareza. Mais resultados.</p>
        </div>
        {/* Centro: Menu */}
        <div className="footer-menu">
          <h3>MENU</h3>
          <ul>
            <li>
              <a href="#inicio">› INÍCIO</a>
            </li>
            <li>
              <a href="#sobre">› SOBRE NÓS</a>
            </li>
            <li>
              <a href="#plano">› PLANO PREMIUM</a>
            </li>
          </ul>
        </div>

        {/* Lado Direito: Redes e Suporte */}
        <div className="footer-social-support">
          <h3>REDES SOCIAIS</h3>
          <div className="social-icons">
            {/* Mensagem -> Email */}
            <a href="mailto:samuel.lazarin12@gmail.com" title="E-mail">
              <Mail size={24} />
            </a>
            <a
              href="https://linkedin.com/in/samuel-lazarin/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
            >
              <MessageSquareText size={24} />
            </a>
          </div>

          <div className="support-box">
            <p>Fale com o suporte</p>
            {/* Botão Entrar com Link WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-entrar"
            >
              ENTRAR
            </a>
          </div>
        </div>
      </div>

      {/* Linha Separadora */}
      <span className="footer-divider"></span>

      {/* Bottom: Copyright e Techs */}
      <div className="footer-bottom">
        <p>© {currentYear} - Desenvolvido por Vallis Tech</p>
        <div className="tech-stack">
          <span className="tech-icon js">JS</span>
          <span className="tech-icon react">REACT</span>
          <span className="tech-icon scss">SCSS</span>
          <span className="tech-icon sql">SQL</span>
          <span className="tech-icon node">NODE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
