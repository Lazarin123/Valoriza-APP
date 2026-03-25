import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./ArtigoRenda.scss";
import ImageArtigoPens from "../../../assets/images/ImagesArtigos/Images-Artigo-Pensamento.png";
import ImageArtigoS from "../../../assets/images/ImagesArtigos/Images-Artigo-Dim.png";
import ImageArtigoSaco from "../../../assets/images/ImagesArtigos/Images-Artigo-Saco.png";

const ArtigoRenda = () => {
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
              <Clock size={14} /> 15 min de leitura
            </span>
            <span className="dificuldade">Fácil</span>
          </div>
        </div>

        <article className="artigo-content">
          <header className="artigo-header">
            <h5>Fundação do planejamento financeiro</h5>
            <h1>1. Entenda os seus Gastos</h1>
            <p className="lead">
              O primeiro passo para dominar suas finanças não é economizar, mas
              sim entender exatamente o volume de recursos que você movimenta
              mensalmente.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoPens}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>Por que listar todas as fontes?</h2>
            <p>
              Muitas pessoas focam apenas no salário fixo, mas esquecem de
              bônus, rendas extras, dividendos ou até restituições. Para um
              planejamento real, cada centavo conta.
            </p>
            <ul>
              <li>Listar todas as fontes de renda bruta.</li>
              <li>Identificar rendas variáveis e sazonais.</li>
              <li>
                Entender o que é e o que não necessidade para um valor fixo.
              </li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoS}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Renda Bruta vs. Renda Líquida</h3>
              <p>
                Este é o erro mais comum: planejar gastos baseando-se no salário
                bruto. O que importa é o que cai na conta após impostos e
                descontos.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Poder da Visualização</h2>
            <p>
              Ao visualizar sua renda de forma clara, seu cérebro começa a
              identificar automaticamente margens para investimentos e cortes
              desnecessários.
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>"Quem não mede o que ganha, não gerencia o que gasta."</p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoSaco}
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

export default ArtigoRenda;
