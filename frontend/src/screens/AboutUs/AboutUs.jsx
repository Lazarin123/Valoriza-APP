import {
  Target,
  Eye,
  Heart,
  CheckCircle,
  TrendingUp,
  Headphones,
} from "lucide-react";
import "./AboutUs.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import aboutImage from "../../assets/images/sobreImage.jpg";
import video from "../../assets/videos/AboutVideo.mp4";

const AboutUs = () => {
  const whatsappNumber = "5511946701625";
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre como funciona a Vallis Tech.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="about-page-wrapper">
      <Header />

      <section className="about-container">
        {/* Título com Background Decorativo */}
        <div className="title-wrapper">
          <h2 className="title-bg">Conheça a Empresa</h2>
          <h3 className="title-main">Conheça a Empresa</h3>
        </div>

        {/* Conteúdo Principal */}
        <div className="main-content">
          <div className="image-wrapper">
            <video autoPlay loop muted playsInline>
              <source src={video} type="video/mp4" />
            </video>
          </div>

          <div className="text-content">
            <h4 className="section-subtitle">Conheça mais da gente!</h4>
            <p className="description">
              A Vollup Tech nasce com a missão de simplificar a relação das
              pessoas com o dinheiro. Desenvolvedora do Valoriza App, nossa
              startup combina engenharia de software de ponta com um design
              intuitivo para entregar uma plataforma de planejamento financeiro
              robusta e acessível.
            </p>

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
            text="Desenvolver tecnologias intuitivas que simplificam o planejamento financeiro."
          />
          <InfoCard
            icon={<Eye size={30} />}
            title="VISÃO"
            text="Ser a principal referência em soluções digitais de gestão pessoal."
          />
          <InfoCard
            icon={<Heart size={30} />}
            title="VALORES"
            text="Transparência total, segurança de dados rigorosa e alta performance."
          />
        </div>
      </section>

      <Footer />
    </div>
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
