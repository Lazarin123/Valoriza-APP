import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UpgradePage.scss";

const UpgradePage = () => {
  const navigate = useNavigate();

  return (
    <div className="upgrade-screen">
      <header className="upgrade-screen__header">
        <div className="upgrade-screen__logo">
          <span className="upgrade-screen__logo-icon">V</span>
          <span className="upgrade-screen__logo-text">Valoriza App</span>
        </div>

        <nav className="upgrade-screen__nav">
          <Link to="/principal" className="upgrade-screen__nav-link">
            Home
          </Link>
          <Link to="/pagamento" className="upgrade-screen__nav-link">
            Pagamento
          </Link>
          <Link to="/about" className="upgrade-screen__nav-link">
            Support
          </Link>
          <button
            className="upgrade-screen__login-btn"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </nav>
      </header>

      <main className="upgrade-screen__main">
        <h1 className="upgrade-screen__title">
          Evolua para o Plano Pro do Valoriza App
        </h1>
        <p className="upgrade-screen__subtitle">
          Desbloqueie ferramentas avançadas para impulsionar seus resultados.
        </p>

        <div className="upgrade-screen__cards-container">
          {/* Card do Plano Básico */}
          <section className="pricing-card">
            <h2 className="pricing-card__title">Plano Básico</h2>
            <div className="pricing-card__price-container">
              <span className="pricing-card__currency">R$</span>
              <span className="pricing-card__amount">0</span>
              <span className="pricing-card__period">/mês</span>
            </div>

            <ul className="pricing-card__features">
              <li className="pricing-card__feature-item">
                • Relatórios e Gráficos Básicos
              </li>
              <li className="pricing-card__feature-item">• Dicas Básicas</li>
              <li className="pricing-card__feature-item">• Artigos Básicos</li>
              <li className="pricing-card__feature-item">
                • Funcionalidades Básicas
              </li>
            </ul>

            <button
              className="pricing-card__button pricing-card__button--disabled"
              disabled
            >
              Seu Plano Atual
            </button>
          </section>

          {/* Card do Plano Pro */}
          <section className="pricing-card pricing-card--pro">
            <div className="pricing-card__badge">RECOMENDADO</div>
            <h2 className="pricing-card__title">Plano Pro</h2>

            <div className="pricing-card__price-container">
              <span className="pricing-card__currency">R$</span>
              <span className="pricing-card__amount">29,90</span>
              <span className="pricing-card__period">/mês</span>
            </div>
            <p className="pricing-card__billing-info">
              Cobrança anual recorrente
            </p>

            <ul className="pricing-card__features">
              <li className="pricing-card__feature-item">
                ✓ Acesso Completo a Recursos Premium
              </li>
              <li className="pricing-card__feature-item">
                ✓ Relatórios Avançados e Personalizados
              </li>
              <li className="pricing-card__feature-item">
                ✓ Dicas e Gráficos Avançados
              </li>
              <li className="pricing-card__feature-item">
                ✓ Suporte Prioritário por WhatsApp 24h
              </li>
              <li className="pricing-card__feature-item">
                ✓ Ferramentas de Investimentos
              </li>
              <li className="pricing-card__feature-item">
                ✓ Funcionalidades Exclusivas
              </li>
              <li className="pricing-card__feature-item">
                ✓ Área de Investimentos Exclusiva
              </li>
            </ul>

            <Link
              to="/pagamento"
              className="pricing-card__button pricing-card__button--primary"
            >
              Atualizar para Pro Agora
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UpgradePage;
