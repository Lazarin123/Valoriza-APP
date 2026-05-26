// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./PaymentPage.scss";

// const PaymentPage = () => {
//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState("pix");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [pixData, setPixData] = useState(null); // Estado para guardar o QR Code e código Copia e Cola
//   const [cardData, setCardData] = useState({
//     number: "",
//     name: "",
//     expiry: "",
//     cvv: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCardData({ ...cardData, [name]: value });
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       if (paymentMethod === "pix") {
//         // Chamada para gerar o PIX
//         const response = await axios.post(
//           "http://localhost:3001/api/payments/pix",
//         );

//         // Salva os dados do Pix no estado para renderizar na tela
//         setPixData(response.data.pixInfo);
//       } else {
//         // Chamada para processar o Cartão de Crédito
//         const response = await axios.post(
//           "http://localhost:3001/api/payments/credit-card",
//           {
//             paymentMethodId: "tok_xxx", // Em produção, isso viria do SDK do gateway (ex: Stripe.js)
//             ...cardData, // Enviando apenas como exemplo, o ideal é usar a tokenização do gateway
//           },
//         );

//         alert("Pagamento processado com sucesso! Bem-vindo ao Plano Pro.");
//         navigate("/principal"); // Redireciona após o sucesso do cartão
//       }
//     } catch (error) {
//       console.error("Erro na transação:", error);
//       alert("Erro ao processar pagamento. Tente novamente.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="payment-page">
//       <header className="payment-page__header">
//         <button onClick={() => navigate(-1)} className="payment-page__back-btn">
//           &lt; Voltar
//         </button>
//         <div className="payment-page__logo">
//           <span className="payment-page__logo-icon">V</span>
//           <span className="payment-page__logo-text">Valoriza App</span>
//         </div>
//         <div className="payment-page__header-title">PAGAMENTO</div>
//       </header>

//       <main className="payment-page__main">
//         <div className="payment-page__content">
//           {/* Coluna Esquerda: Resumo do Pedido */}
//           <aside className="payment-page__summary">
//             <h2 className="payment-page__section-title">RESUMO DO PEDIDO</h2>

//             <div className="payment-page__plan-card">
//               <div className="payment-page__plan-icon">V</div>
//               <div>
//                 <p className="payment-page__plan-name">Valoriza App</p>
//                 <p className="payment-page__plan-tier">Plano PRO</p>
//               </div>
//             </div>

//             <ul className="payment-page__benefits">
//               <li>
//                 <span>Acesso Ilimitado</span> <span>R$ 29,90/mês</span>
//               </li>
//               <li>
//                 <span>Recursos Premium</span>{" "}
//                 <span>Relatórios, Análises Diárias</span>
//               </li>
//               <li>
//                 <span>Suporte Prioritário</span> <span>Chat 24h</span>
//               </li>
//               <li>
//                 <span>Funcionalidades Exclusivas</span> <span>Inclusas</span>
//               </li>
//             </ul>

//             <div className="payment-page__total">
//               <span>Total (Hoje):</span>
//               <span className="payment-page__total-price">R$ 29,90</span>
//             </div>
//           </aside>

//           {/* Coluna Direita: Método de Pagamento */}
//           <section className="payment-page__methods">
//             <h2 className="payment-page__section-title">
//               ESCOLHA O MÉTODO DE PAGAMENTO
//             </h2>

//             <form onSubmit={handlePaymentSubmit}>
//               {/* Opção PIX */}
//               <label
//                 className={`payment-option ${paymentMethod === "pix" ? "payment-option--active" : ""}`}
//               >
//                 <div className="payment-option__header">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="pix"
//                     checked={paymentMethod === "pix"}
//                     onChange={() => setPaymentMethod("pix")}
//                   />
//                   <span className="payment-option__title">Pix</span>
//                 </div>

//                 {paymentMethod === "pix" && (
//                   <div className="payment-option__content payment-option__content--pix">
//                     {pixData ? (
//                       // Se os dados do PIX voltaram da API, exibe o QR Code
//                       <>
//                         <p className="payment-option__pix-info font-bold text-[#1e3a8a]">
//                           Escaneie o QR Code para pagar:
//                         </p>
//                         <div className="flex justify-center my-4">
//                           <img
//                             src={pixData.qrCodeUrl}
//                             alt="QR Code PIX"
//                             className="w-40 h-40 border-2 border-[#1e3a8a] rounded-xl p-2 bg-white"
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-2 break-all px-4">
//                           Ou copie e cole o código abaixo:
//                           <br />
//                           <span className="font-mono text-black">
//                             {pixData.copyAndPaste}
//                           </span>
//                         </p>
//                       </>
//                     ) : (
//                       // Estado inicial antes de clicar em Confirmar
//                       <>
//                         <p className="payment-option__pix-info">
//                           Pagamento instantâneo via Pix.
//                         </p>
//                         <div className="payment-option__qr-placeholder">
//                           [ Clique em Confirmar para gerar o QR Code ]
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </label>

//               {/* Opção Cartão de Crédito */}
//               <label
//                 className={`payment-option ${paymentMethod === "credit_card" ? "payment-option--active" : ""}`}
//               >
//                 <div className="payment-option__header">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="credit_card"
//                     checked={paymentMethod === "credit_card"}
//                     onChange={() => setPaymentMethod("credit_card")}
//                   />
//                   <span className="payment-option__title">
//                     Cartão de Crédito
//                   </span>
//                 </div>

//                 {paymentMethod === "credit_card" && (
//                   <div className="payment-option__content payment-option__content--card">
//                     <div className="form-group">
//                       <label>Número do Cartão</label>
//                       <input
//                         type="text"
//                         name="number"
//                         placeholder="0000 0000 0000 0000"
//                         required
//                         value={cardData.number}
//                         onChange={handleInputChange}
//                         className="bg-white"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>Nome do Titular</label>
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="JOÃO SILVA"
//                         required
//                         value={cardData.name}
//                         onChange={handleInputChange}
//                         className="bg-white"
//                       />
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Validade (MM/AA)</label>
//                         <input
//                           type="text"
//                           name="expiry"
//                           placeholder="05/29"
//                           required
//                           value={cardData.expiry}
//                           onChange={handleInputChange}
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>CVV</label>
//                         <input
//                           type="text"
//                           name="cvv"
//                           placeholder="123"
//                           required
//                           value={cardData.cvv}
//                           onChange={handleInputChange}
//                           className="bg-white"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </label>

//               <div className="payment-page__security-badge">
//                 🔒 Pagamento 100% Seguro. Dados criptografados.
//               </div>

//               {/* Só exibe o botão se o Pix AINDA NÃO tiver sido gerado, ou se for Cartão */}
//               {!(paymentMethod === "pix" && pixData) && (
//                 <button
//                   type="submit"
//                   className="payment-page__submit-btn"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing
//                     ? "Processando..."
//                     : paymentMethod === "pix"
//                       ? "GERAR PIX - R$ 29,90"
//                       : "CONFIRMAR PAGAMENTO - R$ 29,90"}
//                 </button>
//               )}
//             </form>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paymentService } from "../../services/paymentService"; // Conectado à sua API no Render
import "./PaymentPage.scss";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Mapeia o método para o que o seu back-end espera (PIX ou CREDIT_CARD)
      const method = paymentMethod === "pix" ? "PIX" : "CREDIT_CARD";

      // Chamada usando o seu service que aponta para o Render
      const response = await paymentService.checkout({
        payment_method: method,
      });

      if (method === "PIX") {
        // Guarda os dados retornados pelo seu back-end (payment.js)
        setPixData({
          qrCodeUrl: response.data.pix.qr_code,
          copyAndPaste: response.data.pix.qr_code_text,
        });
      } else {
        alert("Pagamento processado com sucesso! Bem-vindo ao Plano Pro.");
        navigate("/principal");
      }
    } catch (error) {
      console.error(
        "Erro na transação:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Erro ao processar pagamento.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-page__header">
        <button onClick={() => navigate(-1)} className="payment-page__back-btn">
          &lt; Voltar
        </button>
        <div className="payment-page__logo">
          <span className="payment-page__logo-icon">V</span>
          <span className="payment-page__logo-text">Valoriza App</span>
        </div>
        <div className="payment-page__header-title">PAGAMENTO</div>
      </header>

      <main className="payment-page__main">
        <div className="payment-page__content">
          <aside className="payment-page__summary">
            <h2 className="payment-page__section-title">RESUMO DO PEDIDO</h2>
            <div className="payment-page__plan-card">
              <div className="payment-page__plan-icon">V</div>
              <div>
                <p className="payment-page__plan-name">Valoriza App</p>
                <p className="payment-page__plan-tier">Plano PRO</p>
              </div>
            </div>
            <ul className="payment-page__benefits">
              <li>
                <span>Acesso Ilimitado</span> <span>R$ 29,90/mês</span>
              </li>
              <li>
                <span>Recursos Premium</span>{" "}
                <span>Relatórios, Análises Diárias</span>
              </li>
              <li>
                <span>Suporte Prioritário</span> <span>Chat 24h</span>
              </li>
              <li>
                <span>Funcionalidades Exclusivas</span> <span>Inclusas</span>
              </li>
            </ul>
            <div className="payment-page__total">
              <span>Total (Hoje):</span>
              <span className="payment-page__total-price">R$ 29,90</span>
            </div>
          </aside>

          <section className="payment-page__methods">
            <h2 className="payment-page__section-title">
              ESCOLHA O MÉTODO DE PAGAMENTO
            </h2>
            <form onSubmit={handlePaymentSubmit}>
              <label
                className={`payment-option ${paymentMethod === "pix" ? "payment-option--active" : ""}`}
              >
                <div className="payment-option__header">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={() => setPaymentMethod("pix")}
                  />
                  <span className="payment-option__title">Pix</span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="payment-option__content payment-option__content--pix">
                    {pixData ? (
                      <>
                        <p className="payment-option__pix-info font-bold text-[#1e3a8a]">
                          Escaneie o QR Code para pagar:
                        </p>
                        <div className="flex justify-center my-4">
                          <img
                            src={pixData.qrCodeUrl}
                            alt="QR Code PIX"
                            className="w-40 h-40 border-2 border-[#1e3a8a] rounded-xl p-2 bg-white"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 break-all px-4">
                          Ou copie e cole o código abaixo:
                          <br />
                          <span className="font-mono text-black">
                            {pixData.copyAndPaste}
                          </span>
                        </p>
                      </>
                    ) : (
                      <div className="payment-option__qr-placeholder">
                        [ Clique em Confirmar para gerar o QR Code ]
                      </div>
                    )}
                  </div>
                )}
              </label>

              <label
                className={`payment-option ${paymentMethod === "credit_card" ? "payment-option--active" : ""}`}
              >
                <div className="payment-option__header">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                  />
                  <span className="payment-option__title">
                    Cartão de Crédito
                  </span>
                </div>
                {paymentMethod === "credit_card" && (
                  <div className="payment-option__content payment-option__content--card">
                    <div className="form-group">
                      <label>Número do Cartão</label>
                      <input
                        type="text"
                        name="number"
                        placeholder="0000 0000 0000 0000"
                        required
                        value={cardData.number}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nome do Titular</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="JOÃO SILVA"
                        required
                        value={cardData.name}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Validade (MM/AA)</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="05/29"
                          required
                          value={cardData.expiry}
                          onChange={handleInputChange}
                          className="bg-white"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          required
                          value={cardData.cvv}
                          onChange={handleInputChange}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              <div className="payment-page__security-badge">
                🔒 Pagamento 100% Seguro. Dados criptografados.
              </div>

              {!(paymentMethod === "pix" && pixData) && (
                <button
                  type="submit"
                  className="payment-page__submit-btn"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processando..."
                    : paymentMethod === "pix"
                      ? "GERAR PIX - R$ 29,90"
                      : "CONFIRMAR PAGAMENTO - R$ 29,90"}
                </button>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
