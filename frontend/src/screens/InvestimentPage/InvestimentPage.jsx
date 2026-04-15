// Imports
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./InvestimentPage.scss";
import investimento2 from "../../assets/images/investimento-Page2.png";
import investimento1video from "../../assets/videos/video-investiment.mp4";
import { Link } from "react-router-dom";

// Ações Gráfico
const barData = [
  { name: "NIKE", value: 45 },
  { name: "NVDA", value: 195 },
  { name: "AAPL", value: 250 },
  { name: "AMZN", value: 255 },
  { name: "TSLA", value: 365 },
];

const InvestmentPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Inicia no White Mode
  const [amount, setAmount] = useState(1);
  const [currencyPair, setCurrencyPair] = useState("USD-BRL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConversion = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${currencyPair}`,
      );
      const data = await response.json();
      const key = currencyPair.replace("-", "");
      const rate = parseFloat(data[key].bid);
      setResult((amount * rate).toFixed(2));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`investment-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Botão de Toggle Flutuante */}
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="7" strokeWidth={3} />
          </svg>
        )}
      </button>

      <div className="investment-page__container">
        <h1 className="investment-page__title">Cotação em tempo real</h1>

        <div className="investment-page__top-grid">
          <div className="investment-page__main-visual">
            <video
              width="100%"
              autoPlay
              muted
              loop
              playsInline
              className="video-wrapper__element"
            >
              <source src={investimento1video} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>

          <div className="investment-page__cards-stack">
            <div
              className="investment-page__card"
              style={{ height: "320px", marginBottom: "20px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "12px", border: "none" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {barData.map((e, i) => (
                      <Cell
                        key={i}
                        fill={i % 2 === 0 ? "#6366f1" : "#fbbf24"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="investment-page__card">
              <div className="converter__controls">
                <h3>Conversor de Moedas</h3>
                <div className="converter__select-wrapper">
                  <select
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                  >
                    <option value="USD-BRL">Dólar for Real</option>
                    <option value="BRL-USD">Real for Dólar</option>
                    <option value="EUR-BRL">Euro for Real</option>
                    <option value="BRL-EUR">Real for Euro</option>
                    <option value="USD-EUR">Dólar for Euro</option>
                    <option value="EUR-USD">Euro for Dólar</option>
                  </select>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="converter__btn-large"
                  onClick={handleConversion}
                >
                  {loading ? "Calculando..." : "Converter Agora"}
                </button>
                {result && (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "1.8rem",
                      color: "#22c55e",
                      fontWeight: "bold",
                      marginTop: "1rem",
                    }}
                  >
                    R$ {result}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="investment-page__stocks-section">
          <h2>Fique de olho nessas Ações</h2>
          <div className="investment-page__stocks-grid">
            <StockCard
              name="Netflix"
              ticker="NFLX"
              trend="+3.2%"
              desc="Crescimento recorde de assinantes impulsiona o valor."
              color="#22c55e"
            />
            <StockCard
              name="Google"
              ticker="GOOGL"
              trend="+1.5%"
              desc="Inovações em IA mantêm a confiança em alta."
              color="#22c55e"
            />
            <StockCard
              name="Petrobras"
              ticker="PETR4"
              trend="-0.8%"
              desc="Instabilidade no petróleo gera cautela no setor."
              color="#ef4444"
            />
          </div>
          <div className="view-more-container">
            <Link to="/acoes" className="investment-page__btn-link">
              Ver Mais Ações
            </Link>
          </div>
        </section>

        <section className="investment-page__about">
          <div className="about__text-content">
            <h2>O que você precisa saber?</h2>
            <p>
              O mercado financeiro é dinâmico. Antes de investir, entenda que
              taxas de câmbio variam a cada segundo. Este conversor utiliza
              dados reais. Aqui te ensinamos como e onde investir, clica em
              saiba mais!
            </p>
            <button
              className="converter__btn-large"
              style={{ width: "auto", marginTop: "2rem", padding: "1rem 3rem" }}
            >
              Saiba Mais!
            </button>
          </div>
          <img
            className="about__image-large"
            src={investimento2}
            alt="Finance"
          />
        </section>
      </div>
    </div>
  );
};

const StockCard = ({ name, ticker, trend, desc, color }) => (
  <div className="stock-card">
    <div className="stock-card__header">
      <h4>{name}</h4>
      <span className="stock-card__trend" style={{ color }}>
        {trend}
      </span>
    </div>
    <p className="stock-card__desc">{desc}</p>
    <div className="stock-card__footer">
      <span>{ticker}</span>
    </div>
  </div>
);

export default InvestmentPage;
