import React from "react";
import "./DicasSection.scss";
import { Link } from "react-router-dom";

// Link unificado para o WhatsApp (ícone e botão)
const whatsappNumber = "5511946701625";
const message = encodeURIComponent(
  "Olá! Gostaria de falar com o suporte do Valoriza App.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

const DicasSection = () => {
  const [isBlured, setIsBlured] = React.useState(true); // Definido como true para teste, altere conforme sua lógica

  return (
    <section className="tips-container">
      <div className="tips-header">
        <h2>Pequenas Dicas que Transformam Sua Vida Financeira</h2>
        <p>Aprenda estratégias simples para melhorar sua saúde financeira</p>
      </div>

      <div className="tips-grid">
        {/* Dica 1 */}
        <article className="tip-card">
          <div className="tip-badge">Fácil • 15 min</div>
          <div className="tip-content">
            <div className="tip-icon-box">
              <span className="icon-emoji">💰</span>
            </div>
            <h4>1. Entenda os seus Gastos</h4>
            <h5>Fundação do planejamento financeiro</h5>
            <p>
              O primeiro passo do planejamento financeiro é entender exatamente
              quanto dinheiro entra todos os meses...
            </p>
            <ul>
              <li>Listar todas as fontes de renda</li>
              <li>Calcular renda líquida (após impostos)</li>
            </ul>
          </div>
          <Link to="/suaRenda" className="btn-learn-more">
            APRENDER MAIS <span>🚀</span>
          </Link>
        </article>

        {/* Dica 2 */}
        <article className="tip-card">
          <div className="tip-badge orange">Médio • 30 min</div>
          <div className="tip-content">
            <div className="tip-icon-box">
              <span className="icon-emoji">📊</span>
            </div>
            <h4>2. Use a Regra 50-30-20</h4>
            <h5>Método simples de divisão de renda</h5>
            <p>
              Uma estratégia muito utilizada no planejamento financeiro é a
              regra 50-30-20. Ela ajuda a equilibrar sua vida...
            </p>
            <ul>
              <li>Separar 50% para necessidades</li>
              <li>Separar 30% para desejos</li>
            </ul>
          </div>
          <Link to="/regra50" className="btn-learn-more">
            APRENDER MAIS <span>🚀</span>
          </Link>
        </article>

        {/* Dica 3 */}
        <article className="tip-card">
          <div className="tip-badge purple">Médio • 6-12 Meses</div>
          <div className="tip-content">
            <div className="tip-icon-box">
              <span className="icon-emoji">🛡️</span>
            </div>
            <h4>3. Crie uma reserva de emergência</h4>
            <h5>Sua proteção financeira</h5>
            <p>
              A reserva de emergência é um dos pilares mais importantes de uma
              vida financeira saudável. Ela serve como...
            </p>
            <ul>
              <li>Calcular custo de vida mensal</li>
              <li>Definir meta (3-6 meses)</li>
            </ul>
          </div>
          <Link to="/reserva" className="btn-learn-more">
            APRENDER MAIS <span>🚀</span>
          </Link>
        </article>

        {/* Container das Dicas Bloqueadas */}
        <div className="tips-lock-wrapper">
          <div className={`tips-content ${isBlured ? "glassed" : ""}`}>
            {/* Dica 4 */}
            <article className="tip-card">
              <div className="tip-badge blue">Fácil • 20 min</div>
              <div className="tip-content">
                <div className="tip-icon-box">
                  <span className="icon-emoji">✂️</span>
                </div>
                <h4>4. Elimine Gastos Fantasmas</h4>
                <h5>Corte o que você não usa</h5>
                <p>
                  Pequenas assinaturas e serviços esquecidos podem drenar
                  centenas de reais do seu orçamento anualmente sem você
                  perceber...
                </p>
                <ul>
                  <li>Revisar assinaturas de streaming</li>
                  <li>Cancelar tarifas bancárias desnecessárias</li>
                </ul>
              </div>
              <Link to="/cortarGastos" className="btn-learn-more">
                APRENDER MAIS <span>🚀</span>
              </Link>
            </article>

            {/* Dica 5 */}
            <article className="tip-card">
              <div className="tip-badge red">Médio • 45 min</div>
              <div className="tip-content">
                <div className="tip-icon-box">
                  <span className="icon-emoji">📉</span>
                </div>
                <h4>5. Priorize Dívidas Caras</h4>
                <h5>Recupere sua liberdade financeira</h5>
                <p>
                  Nem toda dívida é igual. Identificar as taxas de juros mais
                  altas é essencial para parar o efeito "bola de neve"...
                </p>
                <ul>
                  <li>Listar juros do cartão e cheque especial</li>
                  <li>Negociar prazos e taxas menores</li>
                </ul>
              </div>
              <Link to="/dividas" className="btn-learn-more">
                APRENDER MAIS <span>🚀</span>
              </Link>
            </article>

            {/* Dica 6 */}
            <article className="tip-card">
              <div className="tip-badge green">Difícil • Longo Prazo</div>
              <div className="tip-content">
                <div className="tip-icon-box">
                  <span className="icon-emoji">📈</span>
                </div>
                <h4>6. Comece a Investir</h4>
                <h5>Faça o dinheiro trabalhar para você</h5>
                <p>
                  Após formar sua reserva, o próximo passo é multiplicar seu
                  patrimônio através de investimentos inteligentes e
                  constantes...
                </p>
                <ul>
                  <li>Conhecer seu perfil de investidor</li>
                  <li>Diversificar entre renda fixa e variável</li>
                </ul>
              </div>
              <Link to="/investir" className="btn-learn-more">
                APRENDER MAIS <span>🚀</span>
              </Link>
            </article>
          </div>

          {isBlured && (
            <div className="plus-lock">
              <div className="lock-content">
                <img
                  src="frontend\src\assets\icons\cadeado 1.svg"
                  alt="lock/cadeado"
                />
                <div className="lock-details">
                  <h1>Assine o Plano Plus</h1>
                  <p>
                    Organize seus ganhos e gastos de forma simples, rápida e sem
                    depender de banco. Aqui você tem total controle: registre
                    tudo no seu tempo, do seu jeito, com clareza e praticidade.
                    Menos burocracia, mais liberdade para cuidar do que
                    realmente importa.
                  </p>
                  <div className="lock-buttons">
                    <Link to="/upgrade" className="btn-upgrade">
                      Começar agora
                      <span>
                        <img
                          src="frontend\src\assets\icons\Background-arrow-right.svg"
                          alt="começar agora"
                        />
                      </span>
                    </Link>
                    <a
                      href={whatsappUrl}
                      className="btn-upgrade"
                      target="_blank"
                    >
                      Entre em contato
                      <span>
                        <img
                          src="frontend\src\assets\icons\Background-whatsapp.svg"
                          alt="whatsapp"
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DicasSection;
