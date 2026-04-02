import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./DividasCaras";
import ImageArtigoDivida from "../../../assets/images/ImagesArtigos/Images-Artigo-Dividas.png";
import ImageArtigoDvCara from "../../../assets/images/ImagesArtigos/Images-Artigo-DvCara.png";
import ImageArtigoBalanca from "../../../assets/images/ImagesArtigos/Images-Artigo-Balanca.png";

const DividasCaras = () => {
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
              <Clock size={14} /> 10/30 min de leitura
            </span>
            <span className="dificuldade">Médio</span>
          </div>
        </div>

        <article className="artigo-content">
          <header className="artigo-header">
            <h5>Recupere o Controle</h5>
            <h1>5. Priorize Dívidas Caras</h1>
            <p className="lead">
              Nem toda dívida é igual. Algumas podem ter sido feitas de forma
              planejada, mas outras são verdadeiras armadilhas. Identificar e
              atacar as dívidas com as taxas de juros mais altas é o passo mais
              crítico para parar o temido efeito "bola de neve" e recuperar a
              sua liberdade financeira.
            </p>
          </header>

          {/* Imagem 01 - Hero */}
          <section className="image-section">
            <div className="placeholder-img main">
              <img
                className="container__image"
                src={ImageArtigoDivida}
                alt="Imagem de crescimento"
              />
            </div>
          </section>

          <section className="text-section">
            <h2>Como mapear o terreno?</h2>
            <p>
              Para vencer essa batalha, você precisa conhecer o inimigo. Muitas
              vezes, o desespero nos faz olhar apenas para o valor total da
              dívida, quando o verdadeiro perigo está na taxa de juros. Você
              precisa:
            </p>
            <ul>
              <li>Listar juros do cartão e cheque especial.</li>
              <li>Separar por prioridade.</li>
              <li>Anotar não apenas o valor das parcelas.</li>
            </ul>
          </section>

          {/* Imagem 02 - Lado a Lado com Texto (Split) */}
          <section className="split-section">
            <div className="placeholder-img side">
              <img
                className="container__image"
                src={ImageArtigoDvCara}
                alt="Imagem de crescimento"
              />
            </div>
            <div className="split-text">
              <h3>Por que essa estratégia é eficiente?</h3>
              <p>
                Focar no pagamento das dívidas com juros maiores (uma estratégia
                conhecida como método da avalanche) é a forma matemática mais
                rápida de estancar a perda de dinheiro. Se você paga apenas o
                mínimo do cartão e foca em quitar um empréstimo barato, a dívida
                do cartão continuará se multiplicando mês a mês, anulando
                qualquer esforço que você faça.
              </p>
            </div>
          </section>

          <section className="text-section">
            <h2>O Plano de Ação</h2>
            <p>
              Reserve cerca de 45 minutos para esta tarefa de complexidade
              média. Com o raio-x das suas dívidas em mãos, é hora de partir
              para o ataque e negociar prazos e taxas menores. Entre em contato
              com as instituições financeiras. Se não houver acordo, estude a
              possibilidade de trocar uma dívida cara por uma barata (por
              exemplo, pegar um empréstimo pessoal com juros menores para quitar
              o rotativo do cartão à vista).
            </p>

            <div className="highlight-card">
              <BarChart size={24} color="#FD7E15" />
              <p>
                "A verdadeira paz de espírito financeira começa quando você
                deixa de pagar juros e passa a focar na construção do seu
                patrimônio."
              </p>
            </div>
          </section>

          {/* Imagem 03 - Galeria Final */}
          <section className="image-section">
            <div className="placeholder-img footer-img">
              <img
                className="container__image"
                src={ImageArtigoBalanca}
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

export default DividasCaras;
