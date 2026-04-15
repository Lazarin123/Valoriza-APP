import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockPage.scss";

const StocksPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock de dados integrado
  const stocks = [
    {
      id: 1,
      name: "Netflix",
      value: "+3.2%",
      desc: "Crescimento recorde de assinantes impulsiona o valor.",
      ticker: "NFLX",
      type: "positive",
    },
    {
      id: 2,
      name: "Google",
      value: "+1.5%",
      desc: "Inovações em IA mantêm a confiança em alta.",
      ticker: "GOOGL",
      type: "positive",
    },
    {
      id: 3,
      name: "Petrobras",
      value: "-0.8%",
      desc: "Instabilidade no petróleo gera cautela no setor.",
      ticker: "PETR4",
      type: "negative",
    },
    {
      id: 4,
      name: "Apple",
      value: "+2.1%",
      desc: "Lançamento de novos dispositivos supera expectativas.",
      ticker: "AAPL",
      type: "positive",
    },
    {
      id: 5,
      name: "Microsoft",
      value: "+0.7%",
      desc: "Expansão de serviços em nuvem fortalece receita.",
      ticker: "MSFT",
      type: "positive",
    },
    {
      id: 6,
      name: "Tesla",
      value: "-4.2%",
      desc: "Ajustes na cadeia de suprimentos afetam entrega.",
      ticker: "TSLA",
      type: "negative",
    },
    {
      id: 7,
      name: "Amazon",
      value: "+1.1%",
      desc: "Logística otimizada reduz custos operacionais.",
      ticker: "AMZN",
      type: "positive",
    },
    {
      id: 8,
      name: "Nvidia",
      value: "+5.4%",
      desc: "Demanda por hardware de IA atinge níveis históricos.",
      ticker: "NVDA",
      type: "positive",
    },
    {
      id: 9,
      name: "Coca-Cola",
      value: "-0,60%",
      desc: "Um momento simples, um sabor único. Refresque o seu dia com o gelo e o gás perfeitos de uma Coca-Cola gelada.",
      ticker: "KO",
      type: "negative",
    },
    {
      id: 10,
      name: "Mastercard",
      value: "+1,07%",
      desc: "Comece o que não tem preço.",
      ticker: "MA",
      type: "positive",
    },
    {
      id: 11,
      name: "Ford",
      value: "+5,0%",
      desc: "O futuro é movido por inovação.",
      ticker: "F",
      type: "positive",
    },
    {
      id: 12,
      name: "McDonald's",
      value: "-0,20%",
      desc: "Aquela fome de Méqui que não espera.",
      ticker: "MCD",
      type: "negative",
    },
  ];

  return (
    <div className={`page-wrapper ${isDarkMode ? "dark-mode" : "white-mode"}`}>
      <main className="stocks-container">
        <header className="stocks-header">
          <div className="stocks-header__left">
            <button
              className="stocks-header__back"
              onClick={() => navigate(-1)}
            >
              &larr; Voltar
            </button>
            <h1 className="stocks-header__title">Mercado de Ações</h1>
          </div>

          <button
            className="stocks-header__toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        <section className="stocks-grid">
          {stocks.map((stock) => (
            <div key={stock.id} className="stock-card">
              <div className="stock-card__top">
                <h2 className="stock-card__name">{stock.name}</h2>
                <span
                  className={`stock-card__percentage stock-card__percentage--${stock.type}`}
                >
                  {stock.value}
                </span>
              </div>

              <p className="stock-card__description">{stock.desc}</p>

              <div className="stock-card__footer">
                <span className="stock-card__ticker">{stock.ticker}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default StocksPage;
