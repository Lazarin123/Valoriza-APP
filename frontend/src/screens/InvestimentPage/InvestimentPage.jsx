// // Imports
// import React, { useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
//   YAxis,
// } from "recharts";
// import "./InvestimentPage.scss";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";

// // Certifique-se de que estes caminhos existem no seu projeto!
// import investimento2 from "../../assets/images/investimento-Page2.png";
// import investimento1video from "../../assets/videos/video-investiment.mp4";
// import { Link } from "react-router-dom";

// // Ações Gráfico (Apenas para o card de exemplo em cima)
// const barData = [
//   { name: "NIKE", value: 45 },
//   { name: "NVDA", value: 195 },
//   { name: "AAPL", value: 250 },
//   { name: "AMZN", value: 255 },
//   { name: "TSLA", value: 365 },
// ];

// const InvestmentPage = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [amount, setAmount] = useState(1);
//   const [currencyPair, setCurrencyPair] = useState("USD-BRL");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- ESTADOS DO PORTFÓLIO ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [purchaseData, setPurchaseData] = useState({
//     ticker: "",
//     date: "",
//     quantity: "",
//     price: "",
//   });

//   // Começando o array VAZIO, como você pediu!
//   const [purchases, setPurchases] = useState([]);

//   // --- LÓGICA DO GRÁFICO AUTOMÁTICO ---
//   const portfolioChartData = useMemo(() => {
//     if (purchases.length === 0) return [];

//     const sortedPurchases = [...purchases].sort(
//       (a, b) => new Date(a.date) - new Date(b.date),
//     );

//     let cumulativeValue = 0;
//     return sortedPurchases.map((p) => {
//       cumulativeValue += p.total;
//       return {
//         date: p.date,
//         totalValue: cumulativeValue,
//       };
//     });
//   }, [purchases]);

//   const handleConversion = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://economia.awesomeapi.com.br/json/last/${currencyPair}`,
//       );
//       const data = await response.json();
//       const key = currencyPair.replace("-", "");
//       const rate = parseFloat(data[key].bid);
//       setResult((amount * rate).toFixed(2));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddPurchase = (e) => {
//     e.preventDefault();
//     const { ticker, date, quantity, price } = purchaseData;
//     if (!ticker || !date || !quantity || !price) return;

//     const total = parseFloat(quantity) * parseFloat(price);
//     const newPurchase = {
//       id: Date.now(),
//       ticker: ticker.toUpperCase(),
//       date,
//       quantity: parseFloat(quantity),
//       price: parseFloat(price),
//       total,
//     };

//     setPurchases([...purchases, newPurchase]);
//     setIsModalOpen(false);
//     setPurchaseData({ ticker: "", date: "", quantity: "", price: "" });
//   };

//   const handleDeleteAsset = (id) => {
//     setPurchases(purchases.filter((p) => p.id !== id));
//   };

//   const handleSellAsset = (id) => {
//     alert("Ação vendida com sucesso! O saldo foi liberado.");
//     handleDeleteAsset(id);
//   };

//   return (
//     <>
//       <Header />
//       <div className={`investment-page ${isDarkMode ? "dark-mode" : ""}`}>
//         <button
//           className="theme-toggle"
//           onClick={() => setIsDarkMode(!isDarkMode)}
//         >
//           {isDarkMode ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <circle cx="12" cy="12" r="7" strokeWidth={3} />
//             </svg>
//           )}
//         </button>

//         <div className="investment-page__container">
//           {/* --- BOTÃO VOLTAR ADICIONADO AQUI --- */}
//           <Link to="/principal" className="investment-page__btn-back">
//             &#8592; Voltar
//           </Link>

//           <h1 className="investment-page__title">Cotação em tempo real</h1>

//           <div className="investment-page__top-grid">
//             <div className="investment-page__main-visual">
//               <video
//                 width="100%"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="video-wrapper__element"
//               >
//                 <source src={investimento1video} type="video/mp4" />
//                 Seu navegador não suporta a tag de vídeo.
//               </video>
//             </div>

//             <div className="investment-page__cards-stack">
//               <div
//                 className="investment-page__card"
//                 style={{ height: "320px", marginBottom: "20px" }}
//               >
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={barData}>
//                     <XAxis
//                       dataKey="name"
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
//                     />
//                     <Tooltip
//                       cursor={{ fill: "transparent" }}
//                       contentStyle={{ borderRadius: "12px", border: "none" }}
//                     />
//                     <Bar dataKey="value" radius={[8, 8, 0, 0]}>
//                       {barData.map((e, i) => (
//                         <Cell
//                           key={i}
//                           fill={i % 2 === 0 ? "#6366f1" : "#fbbf24"}
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="investment-page__card">
//                 <div className="converter__controls">
//                   <h3>Conversor de Moedas</h3>
//                   <div className="converter__select-wrapper">
//                     <select
//                       value={currencyPair}
//                       onChange={(e) => setCurrencyPair(e.target.value)}
//                     >
//                       <option value="USD-BRL">Dólar for Real</option>
//                       <option value="BRL-USD">Real for Dólar</option>
//                       <option value="EUR-BRL">Euro for Real</option>
//                       <option value="BRL-EUR">Real for Euro</option>
//                       <option value="USD-EUR">Dólar for Euro</option>
//                       <option value="EUR-USD">Euro for Dólar</option>
//                     </select>
//                   </div>
//                   <input
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                   <button
//                     className="converter__btn-large"
//                     onClick={handleConversion}
//                   >
//                     {loading ? "Calculando..." : "Converter Agora"}
//                   </button>
//                   {result && (
//                     <div
//                       style={{
//                         textAlign: "center",
//                         fontSize: "1.8rem",
//                         color: "#22c55e",
//                         fontWeight: "bold",
//                         marginTop: "1rem",
//                       }}
//                     >
//                       R$ {result}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* --- SEÇÃO PORTFÓLIO --- */}
//           <section className="investment-page__portfolio-section">
//             <div className="portfolio__header">
//               <div className="portfolio__texts">
//                 <h2>Minha Ações!</h2>
//                 <p>
//                   Gerencie seus ativos e acompanhe a evolução do seu patrimônio
//                   automaticamente.
//                 </p>
//               </div>
//               <button
//                 className="converter__btn-large"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 + Adicionar Compra
//               </button>
//             </div>

//             <div className="portfolio__content-grid">
//               <div className="portfolio__chart-card">
//                 {portfolioChartData.length > 0 ? (
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={portfolioChartData}>
//                       <CartesianGrid
//                         strokeDasharray="3 3"
//                         stroke={isDarkMode ? "#334155" : "#e2e8f0"}
//                         vertical={false}
//                       />
//                       <XAxis
//                         dataKey="date"
//                         tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <YAxis
//                         tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
//                         axisLine={false}
//                         tickLine={false}
//                         tickFormatter={(value) => `R$${value}`}
//                       />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: isDarkMode ? "#1e293b" : "#fff",
//                           borderRadius: "12px",
//                           border: "none",
//                           color: isDarkMode ? "#fff" : "#000",
//                           boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//                         }}
//                         formatter={(value) => [
//                           `R$ ${value.toFixed(2)}`,
//                           "Patrimônio Acumulado",
//                         ]}
//                         labelFormatter={(label) => `Data: ${label}`}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="totalValue"
//                         stroke="#6366f1"
//                         strokeWidth={4}
//                         dot={{
//                           r: 6,
//                           fill: "#fbbf24",
//                           strokeWidth: 2,
//                           stroke: "#fff",
//                         }}
//                         activeDot={{ r: 8 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div className="portfolio__empty-chart">
//                     <p>Adicione sua primeira ação para ver o gráfico.</p>
//                   </div>
//                 )}
//               </div>

//               <div className="portfolio__assets-list">
//                 <h3>Ativos na Carteira</h3>
//                 <div className="assets-list__container">
//                   {purchases.length === 0 ? (
//                     <p className="assets-list__empty">
//                       Sua carteira está vazia.
//                     </p>
//                   ) : (
//                     purchases.map((asset) => (
//                       <div key={asset.id} className="asset-item">
//                         <div className="asset-item__info">
//                           <span className="asset-item__ticker">
//                             {asset.ticker}
//                           </span>
//                           <span className="asset-item__date">
//                             {asset.date.split("-").reverse().join("/")}
//                           </span>
//                         </div>
//                         <div className="asset-item__details">
//                           <span>{asset.quantity} cotas</span>
//                           <span>R$ {asset.price.toFixed(2)}</span>
//                           <strong>R$ {asset.total.toFixed(2)}</strong>
//                         </div>
//                         <div className="asset-item__actions">
//                           <button
//                             className="btn-sell"
//                             onClick={() => handleSellAsset(asset.id)}
//                           >
//                             Vender
//                           </button>
//                           <button
//                             className="btn-delete"
//                             onClick={() => handleDeleteAsset(asset.id)}
//                           >
//                             Excluir
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="investment-page__stocks-section">
//             <h2>Fique de olho nessas Ações</h2>
//             <div className="investment-page__stocks-grid">
//               <StockCard
//                 name="Netflix"
//                 ticker="NFLX"
//                 trend="+3.2%"
//                 desc="Crescimento recorde de assinantes impulsiona o valor."
//                 color="#22c55e"
//               />
//               <StockCard
//                 name="Google"
//                 ticker="GOOGL"
//                 trend="+1.5%"
//                 desc="Inovações em IA mantêm a confiança em alta."
//                 color="#22c55e"
//               />
//               <StockCard
//                 name="Petrobras"
//                 ticker="PETR4"
//                 trend="-0.8%"
//                 desc="Instabilidade no petróleo gera cautela no setor."
//                 color="#ef4444"
//               />
//             </div>
//             <div className="view-more-container">
//               <Link to="/acoes" className="investment-page__btn-link">
//                 Ver Mais Ações
//               </Link>
//             </div>
//           </section>

//           <section className="investment-page__about">
//             <div className="about__text-content">
//               <h2>O que você precisa saber?</h2>
//               <p>
//                 O mercado financeiro é dinâmico. Antes de investir, entenda que
//                 taxas de câmbio variam a cada segundo. Este conversor utiliza
//                 dados reais. Aqui te ensinamos como e onde investir, clica em
//                 saiba mais! Leia abaixo para entender mais!
//               </p>
//               <Link
//                 to="/dicas-investimentos"
//                 className="converter__btn-large"
//                 style={{
//                   width: "auto",
//                   marginTop: "2rem",
//                   padding: "1rem 3rem",
//                 }}
//               >
//                 Saiba Mais!
//               </Link>
//             </div>
//             <img
//               className="about__image-large"
//               src={investimento2}
//               alt="Finance"
//             />
//           </section>
//         </div>

//         {isModalOpen && (
//           <div className="portfolio-modal__overlay">
//             <div className="portfolio-modal__content">
//               <button
//                 className="portfolio-modal__close"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 ✕
//               </button>
//               <h3>Adicionar Nova Compra</h3>
//               <form onSubmit={handleAddPurchase}>
//                 <div className="form-group">
//                   <label>Ativo (Ex: PETR4)</label>
//                   <input
//                     type="text"
//                     value={purchaseData.ticker}
//                     onChange={(e) =>
//                       setPurchaseData({
//                         ...purchaseData,
//                         ticker: e.target.value,
//                       })
//                     }
//                     required
//                     placeholder="Código da ação"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Data da Compra</label>
//                   <input
//                     type="date"
//                     value={purchaseData.date}
//                     onChange={(e) =>
//                       setPurchaseData({ ...purchaseData, date: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Quantidade</label>
//                   <input
//                     type="number"
//                     min="1"
//                     step="1"
//                     placeholder="Ex: 10"
//                     value={purchaseData.quantity}
//                     onChange={(e) =>
//                       setPurchaseData({
//                         ...purchaseData,
//                         quantity: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Valor Unitário (R$)</label>
//                   <input
//                     type="number"
//                     min="0.01"
//                     step="0.01"
//                     placeholder="Ex: 25.50"
//                     value={purchaseData.price}
//                     onChange={(e) =>
//                       setPurchaseData({
//                         ...purchaseData,
//                         price: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="converter__btn-large"
//                   style={{ width: "100%", marginTop: "1rem" }}
//                 >
//                   Salvar na Carteira
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// const StockCard = ({ name, ticker, trend, desc, color }) => (
//   <div className="stock-card">
//     <div className="stock-card__header">
//       <h4>{name}</h4>
//       <span className="stock-card__trend" style={{ color }}>
//         {trend}
//       </span>
//     </div>
//     <p className="stock-card__desc">{desc}</p>
//     <div className="stock-card__footer">
//       <span>{ticker}</span>
//     </div>
//   </div>
// );

// export default InvestmentPage;

// Imports
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
} from "recharts";
import "./InvestimentPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Certifique-se de que estes caminhos existem no seu projeto!
import investimento2 from "../../assets/images/investimento-Page1";
import investimento1video from "../../assets/videos/video-investiment.mp4";
import { Link } from "react-router-dom";

// Ações Gráfico (Apenas para o card de exemplo em cima)
const barData = [
  { name: "NIKE", value: 45 },
  { name: "NVDA", value: 195 },
  { name: "AAPL", value: 250 },
  { name: "AMZN", value: 255 },
  { name: "TSLA", value: 365 },
];

const InvestmentPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [amount, setAmount] = useState(1);
  const [currencyPair, setCurrencyPair] = useState("USD-BRL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- ESTADOS DO PORTFÓLIO ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    ticker: "",
    date: "",
    quantity: "",
    price: "",
  });

  // Começando o array VAZIO, como você pediu!
  const [purchases, setPurchases] = useState([]);

  // --- LÓGICA DO GRÁFICO AUTOMÁTICO ---
  const portfolioChartData = useMemo(() => {
    if (purchases.length === 0) return [];

    const sortedPurchases = [...purchases].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let cumulativeValue = 0;
    return sortedPurchases.map((p) => {
      cumulativeValue += p.total;
      return {
        date: p.date,
        totalValue: cumulativeValue,
      };
    });
  }, [purchases]);

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

  const handleAddPurchase = (e) => {
    e.preventDefault();
    const { ticker, date, quantity, price } = purchaseData;
    if (!ticker || !date || !quantity || !price) return;

    const total = parseFloat(quantity) * parseFloat(price);
    const newPurchase = {
      id: Date.now(),
      ticker: ticker.toUpperCase(),
      date,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      total,
    };

    setPurchases([...purchases, newPurchase]);
    setIsModalOpen(false);
    setPurchaseData({ ticker: "", date: "", quantity: "", price: "" });
  };

  const handleDeleteAsset = (id) => {
    setPurchases(purchases.filter((p) => p.id !== id));
  };

  const handleSellAsset = (id) => {
    alert("Ação vendida com sucesso! O saldo foi liberado.");
    handleDeleteAsset(id);
  };

  return (
    <>
      <Header />
      <div className={`investment-page ${isDarkMode ? "dark-mode" : ""}`}>
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
          {/* --- BOTÃO VOLTAR ADICIONADO AQUI --- */}
          <Link to="/principal" className="investment-page__btn-back">
            &#8592; Voltar
          </Link>

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

          {/* --- SEÇÃO PORTFÓLIO --- */}
          <section className="investment-page__portfolio-section">
            <div className="portfolio__header">
              <div className="portfolio__texts">
                <h2>Minha Ações!</h2>
                <p>
                  Gerencie seus ativos e acompanhe a evolução do seu patrimônio
                  automaticamente.
                </p>
              </div>
              <button
                className="converter__btn-large"
                onClick={() => setIsModalOpen(true)}
              >
                + Adicionar Compra
              </button>
            </div>

            <div className="portfolio__content-grid">
              <div className="portfolio__chart-card">
                {portfolioChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioChartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                          borderRadius: "12px",
                          border: "none",
                          color: isDarkMode ? "#fff" : "#000",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value) => [
                          `R$ ${value.toFixed(2)}`,
                          "Patrimônio Acumulado",
                        ]}
                        labelFormatter={(label) => `Data: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalValue"
                        stroke="#6366f1"
                        strokeWidth={4}
                        dot={{
                          r: 6,
                          fill: "#fbbf24",
                          strokeWidth: 2,
                          stroke: "#fff",
                        }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="portfolio__empty-chart">
                    <p>Adicione sua primeira ação para ver o gráfico.</p>
                  </div>
                )}
              </div>

              <div className="portfolio__assets-list">
                <h3>Ativos na Carteira</h3>
                <div className="assets-list__container">
                  {purchases.length === 0 ? (
                    <p className="assets-list__empty">
                      Sua carteira está vazia.
                    </p>
                  ) : (
                    purchases.map((asset) => (
                      <div key={asset.id} className="asset-item">
                        <div className="asset-item__info">
                          <span className="asset-item__ticker">
                            {asset.ticker}
                          </span>
                          <span className="asset-item__date">
                            {asset.date.split("-").reverse().join("/")}
                          </span>
                        </div>
                        <div className="asset-item__details">
                          <span>{asset.quantity} cotas</span>
                          <span>R$ {asset.price.toFixed(2)}</span>
                          <strong>R$ {asset.total.toFixed(2)}</strong>
                        </div>
                        <div className="asset-item__actions">
                          <button
                            className="btn-sell"
                            onClick={() => handleSellAsset(asset.id)}
                          >
                            Vender
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteAsset(asset.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

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
              <Link
                to="/dicas-investimentos"
                className="converter__btn-large"
                style={{
                  width: "auto",
                  marginTop: "2rem",
                  padding: "1rem 3rem",
                }}
              >
                Saiba Mais!
              </Link>
            </div>
            <img
              className="about__image-large"
              src={investimento2}
              alt="Finance"
            />
          </section>
        </div>

        {isModalOpen && (
          <div className="portfolio-modal__overlay">
            <div className="portfolio-modal__content">
              <button
                className="portfolio-modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h3>Adicionar Nova Compra</h3>
              <form onSubmit={handleAddPurchase}>
                <div className="form-group">
                  <label>Ativo (Ex: PETR4)</label>
                  <input
                    type="text"
                    value={purchaseData.ticker}
                    onChange={(e) =>
                      setPurchaseData({
                        ...purchaseData,
                        ticker: e.target.value,
                      })
                    }
                    required
                    placeholder="Código da ação"
                  />
                </div>
                <div className="form-group">
                  <label>Data da Compra</label>
                  <input
                    type="date"
                    value={purchaseData.date}
                    onChange={(e) =>
                      setPurchaseData({ ...purchaseData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Ex: 10"
                    value={purchaseData.quantity}
                    onChange={(e) =>
                      setPurchaseData({
                        ...purchaseData,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valor Unitário (R$)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Ex: 25.50"
                    value={purchaseData.price}
                    onChange={(e) =>
                      setPurchaseData({
                        ...purchaseData,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="converter__btn-large"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Salvar na Carteira
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
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
