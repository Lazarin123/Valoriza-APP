import React from 'react';
import { Target, Eye, Heart, CheckCircle, TrendingUp, Headphones } from 'lucide-react';
import './AboutUs.scss';

const AboutUs = () => {
  const whatsappNumber = "5511946701625";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre como funciona a Valoriza.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section className="about-container">
      
      {/* Título com Background Decorativo */}
      <div className="title-wrapper">
        <h2 className="title-bg">Empresa</h2>
        <h3 className="title-main">
          Conheça a Empresa
          <span className="title-underline"></span>
        </h3>
      </div>

      {/* Conteúdo Principal */}
      <div className="main-content">
        <div className="image-wrapper">
          <img 
            src="../../assets/images/foto sobre nós.jpg" 
            alt="Dashboard Valoriza" 
            className="about-image"
          />
        </div>

        <div className="text-content">
          <h4 className="section-subtitle">Conheça mais da gente!</h4>
          <p className="description">
            A Vallis Tech nasce com a missão de simplificar a relação das pessoas com o dinheiro. Desenvolvedora do Valoriza App, nossa startup combina engenharia de software de ponta com um design intuitivo para entregar uma plataforma de planejamento financeiro robusta e acessível. Sob a liderança de especialistas em Desenvolvimento e Qualidade, focamos em performance, segurança e uma experiência de usuário impecável, garantindo que o controle das suas finanças seja tão fluido quanto clicar em um botão.
          </p>

          {/* Link para WhatsApp estilizado como botão */}
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-button"
          >
            FALE CONOSCO NO WHATSAPP <span className="arrow">→</span>
          </a>

          <div className="features-list">
            <FeatureItem 
              icon={<CheckCircle size={20} />} 
              title="Profissionalismo" 
              desc="Profissionais experientes e capacitados" 
            />
            <FeatureItem 
              icon={<TrendingUp size={20} />} 
              title="Melhora financeira" 
              desc="Ajudamos vocês a economizarem muito!" 
            />
            <FeatureItem 
              icon={<Headphones size={20} />} 
              title="Suporte Preparado" 
              desc="Suporte com toda dedicação para te ajudar" 
            />
          </div>
        </div>
      </div>

      {/* Cards de Missão, Visão e Valores */}
      <div className="info-cards-grid">
        <InfoCard 
          icon={<Target size={30} />}
          title="MISSÃO"
          text="Desenvolver tecnologias intuitivas que simplificam o planejamento financeiro, entregando clareza e controle na palma da mão de cada usuário."
        />
        <InfoCard 
          icon={<Eye size={30} />}
          title="VISÃO"
          text="Ser a principal referência em soluções digitais de gestão pessoal, transformando a forma como as pessoas se relacionam com o próprio dinheiro."
        />
        <InfoCard 
          icon={<Heart size={30} />}
          title="VALORES"
          text="Transparência total, segurança de dados rigorosa e uma experiência de usuário (UX) centrada na facilidade e na alta performance."
        />
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="feature-item">
    <div className="feature-icon">{icon}</div>
    <div className="feature-texts">
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  </div>
);

const InfoCard = ({ icon, title, text }) => (
  <div className="info-card">
    <div className="info-card-header">
      {icon}
      <h4>{title}</h4>
    </div>
    <p>{text}</p>
  </div>
);

export default AboutUs;
