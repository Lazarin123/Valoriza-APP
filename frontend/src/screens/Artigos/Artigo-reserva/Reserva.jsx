import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./Reserva.scss";
import ImageArtigoProt from "../../../assets/images/ImagesArtigos/Images-Artigo-Proteção.png";
import ImageArtigoCresc from "../../../assets/images/ImagesArtigos/Images-Artigo-Crescimento.png";
import ImageArtigoCorrente from "../../../assets/images/ImagesArtigos/Images-Artigo-SoltandoCorrentes.png";

const ArtigoReserva = () => {
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
              <Clock size={14} /> 15/30 min de leitura
            </span>
            <span className="dificuldade">Médio</span>
          </div>
        </div>

        <article className="artigo-content">
          <header className="artigo-header">
            <h5>A Base da Liberdade:</h5>
            <h1>3. Reserva de Emergência</h1>
            <p className="lead">
              Antes de investir ou consumir, você precisa de um "colchão"
              financeiro. A reserva de emergência é o que separa um imprevisto
              de um desastre financeiro.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoProt}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>O que é e para que serve?</h2>
            <p>
              A reserva de emergência é um montante guardado especificamente
              para cobrir gastos inesperados ou queda de renda. Ela não é um
              investimento para render lucros altos, mas sim um seguro de vida
              financeiro.
            </p>
            <ul>
              <li>Segurança Psicológica.</li>
              <li>Evitar Dívidas.</li>
              <li>Poder de Negociação.</li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoCresc}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Quanto eu devo guardar?</h3>
              <p>
                O valor ideal depende da sua estabilidade profissional. A regra
                geral utiliza o seu Custo de Vida Mensal (e não seu salário
                bruto) como base.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Poder da Constância</h2>
            <p>
              Não tente montar a reserva da noite para o dia. O segredo é a
              automação. Separe uma quantia fixa assim que o dinheiro cair na
              conta, tratando a reserva como o seu boleto mais importante.
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>
                "A reserva de emergência não é sobre quanto você ganha, mas
                sobre o quanto você dorme tranquilo."
              </p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoCorrente}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <footer className="artigo-footer-cta">
            <h3>Pronto para organizar seus gastos?</h3>
            <Link to="/principal" className="btn-cta-orange">
              IR PARA MEUS GASTOS 🚀
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArtigoReserva;
