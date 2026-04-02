import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./CortarGastos";
import ImageArtigoCorte from "../../../assets/images/ImagesArtigos/Images-Artigo-Corte.png";
import ImageArtigoPlaneje from "../../../assets/images/ImagesArtigos/Images-Artigo-Planeje.png";
import ImageArtigoArvore from "../../../assets/images/ImagesArtigos/Images-Artigo-Arvore.png";

const CortarGastos = () => {
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
              <Clock size={14} /> 5/15 min de leitura
            </span>
            <span className="dificuldade">Fácil</span>
          </div>
        </div>

        <article className="artigo-content">
          <header className="artigo-header">
            <h5>O Segredo da Economia</h5>
            <h1>4. Elimine Gastos Fantasmas</h1>
            <p className="lead">
              Você tem a sensação de que o dinheiro some da sua conta e não sabe
              para onde foi? Muitas vezes, os grandes vilões do orçamento não
              são as compras caras, mas sim aqueles pequenos valores que são
              descontados todos os meses sem você sequer notar.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoCorte}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>Como identificar esses gastos?</h2>
            <p>
              Gastos fantasmas são aquelas pequenas assinaturas e serviços
              esquecidos que podem drenar centenas de reais do seu orçamento
              anualmente sem você perceber. Para combatê-los, você precisa fazer
              uma varredura:
            </p>
            <ul>
              <li>Revisar assinaturas de streaming.</li>
              <li>Cancelar tarifas bancárias desnecessárias.</li>
              <li>Aplicativos e testes gratuitos.</li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoArvore}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Por que essa limpeza é eficiente?</h3>
              <p>
                Diferente de um gasto impulsivo no shopping, os gastos fantasmas
                são invisíveis e contínuos. Eles se camuflam na fatura do cartão
                de crédito. Cortar o que você não usa é a forma mais rápida e
                indolor de "ganhar" um aumento. É um dinheiro que já é seu e que
                pode ser redirecionado imediatamente para seus investimentos ou
                para algo que realmente traga alegria à sua vida.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Plano de Ação</h2>
            <p>
              Esta é uma tarefa fácil que leva cerca de 20 minutos. Pegue a
              fatura do seu cartão de crédito do último mês e o extrato da sua
              conta corrente. Liste tudo o que for débito automático ou
              assinatura mensal. Seja implacável: se você não usou aquele
              serviço nos últimos 30 dias, pause ou cancele a assinatura agora
              mesmo.
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>
                "Cuidar dos pequenos vazamentos é a melhor forma de evitar que o
                seu navio financeiro afunde."
              </p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoPlaneje}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <footer className="artigo-footer-cta">
            <h3>Pronto para organizar seus gastos?</h3>
            <Link to="/principal" className="btn-cta-orange">
              REVISAR MEUS GASTOS 🚀
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default CortarGastos;
