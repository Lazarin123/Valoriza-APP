import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./Artigo-50-30-20.scss";
import ImageArtigoGrafico from "../../../assets/images/ImagesArtigos/Images-Artigo-Regra.png";
import ImageArtigoRegra50 from "../../../assets/images/ImagesArtigos/Images-Artigo-regra50.png";
import ImageArtigoCerteiro from "../../../assets/images/ImagesArtigos/Images-Artigo-Certeiro.png";

const ArtigoRegra = () => {
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
            <h5>A Regra de Ouro:</h5>
            <h1>2. O Método 50-30-20</h1>
            <p className="lead">
              Não sabe para onde seu dinheiro vai todo mês? Este método simples
              divide sua renda líquida em três grandes categorias para
              equilibrar o hoje e o amanhã.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoGrafico}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>Como funciona a divisão?</h2>
            <p>
              A regra 50-30-20 é uma diretriz de orçamento que ajuda a priorizar
              o que realmente importa sem abrir mão do seu estilo de vida.
            </p>
            <ul>
              <li>50% necessidades básicas (Aluguel, Mercado, Luz, etc).</li>
              <li>
                30% Desejos Pessoais (Lazer, Jantares fora, assinaturas, etc).
              </li>
              <li>
                20% Futuro (Investimentos, Pagamento de dívidas, montagem da
                reserva, etc).
              </li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoRegra50}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Por que este método é eficiente?</h3>
              <p>
                Diferente de planilhas complexas com centenas de categorias,
                aqui você foca no macro. Se você gasta 60% com necessidades,
                sabe que precisa ajustar o padrão de vida ou buscar renda extra
                para equilibrar os outros pilares.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Ajuste Fino</h2>
            <p>
              Lembre-se: o 50-30-20 é um ponto de partida, não uma lei imutável.
              No início da carreira ou em momentos de crise, seus custos fixos
              podem tomar 70%. O objetivo do Valoriza é te ajudar a caminhar
              gradualmente em direção ao equilíbrio ideal.
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>
                "Orçamento não é sobre limitar sua liberdade, é sobre dar
                permissão para gastar com o que você ama."
              </p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoCerteiro}
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

export default ArtigoRegra;
