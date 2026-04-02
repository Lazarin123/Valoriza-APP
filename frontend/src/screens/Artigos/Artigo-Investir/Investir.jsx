import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./Investir";
import ImageArtigoNote from "../../../assets/images/ImagesArtigos/Images-Artigo-Note.png";
import ImageArtigoMao from "../../../assets/images/ImagesArtigos/Images-Artigo-Mao.png";
import ImageArtigoMoca from "../../../assets/images/ImagesArtigos/Images-Artigo-Moca.png";

const Investir = () => {
  return (
    <div className="artigo-container">
      <Header />

      <main className="artigo-main">
        {/* Navegação e Meta Dados */}
        <div className="artigo-nav">
          <Link to="/principal" className="btn-voltar">
            <ArrowLeft size={18} /> Voltar ao Dashboard
          </Link>
          <div className="badge-meta">
            <span>
              <Clock size={14} /> 7/45 min de leitura
            </span>
            <span className="dificuldade">Difícil</span>
          </div>
        </div>

        <article className="artigo-content">
          <header className="artigo-header">
            <h5>O Próximo Nível</h5>
            <h1>6. Comece a Investir</h1>
            <p className="lead">
              Você organizou a casa, eliminou os gastos fantasmas e estruturou
              seu orçamento. Parabéns! Agora, chegou a hora de mudar a dinâmica
              do jogo: deixar de trabalhar apenas pelo dinheiro e fazer com que
              ele comece a trabalhar para você. Após formar sua base, o próximo
              passo é multiplicar seu patrimônio de forma inteligente e
              constante.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoNote}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>O mapa do crescimento</h2>
            <p>
              Entrar no mundo dos investimentos é uma jornada de longo prazo e
              exige estudo, mas o segredo é dar um passo de cada vez com
              estratégia:
            </p>
            <ul>
              <li>Conheça seu perfil de Investidor.</li>
              <li>Diversifique entre renda Fixa e Variável.</li>
              <li>Entenda as Ações.</li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoMao}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Por que a constância é o verdadeiro segredo?</h3>
              <p>
                No mundo dos investimentos, o tempo é o seu maior aliado graças
                ao poder dos juros compostos. Diferente da poupança tradicional,
                investimentos bem estruturados geram "juros sobre juros".
                Pequenos aportes mensais, feitos de forma disciplinada ao longo
                dos anos, criam um efeito "bola de neve" positivo, construindo
                uma máquina capaz de gerar renda passiva para o seu futuro.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Plano de Ação</h2>
            <p>
              Como esta é uma etapa classificada como difícil, comece devagar.
              Abra uma conta em uma corretora de valores de confiança e responda
              ao questionário para descobrir seu perfil. Use uma parte da sua
              meta de poupança mensal (lembra dos 20% do método 50-30-20?) para
              fazer o seu primeiro investimento em um título de renda fixa
              seguro. O foco agora não é ficar rico da noite para o dia, mas sim
              criar o hábito de investir todos os meses.
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>
                "Os juros compostos são a oitava maravilha do mundo. Quem
                entende, ganha. Quem não entende, paga."
              </p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoMoca}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <footer className="artigo-footer-cta">
            <h3>Pronto para organizar seus gastos?</h3>
            <Link to="/principal" className="btn-cta-orange">
              Organizar Minhas Dívidas 🚀
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Investir;
