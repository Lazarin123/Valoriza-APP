import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage/loginPage";
import RegistrationPage from "./screens/RegistrationPage/RegistrationPage";
import AboutUs from "./screens/AboutUs/AboutUs";
import PrincipalPage from "./screens/PrincipalPage/PrincipalPage";
import ArtigoRenda from "./screens/Artigos/Artigo-SuaRenda/ArtigoRenda";
import ArtigoReserva from "./screens/Artigos/Artigo-reserva/Reserva";
import ArtigoRegra from "./screens/Artigos/Artigo-50-30-20/Artigo-50-30-20";
import UpgradePage from "./screens/UpgradePage/UpgradePage";
import PaymentPage from "./screens/PaymentPage/PaymentPage";
import CortarGastos from "./screens/Artigos/Artigo-CortarGastos/CortarGastos";
import DividasCaras from "./screens/Artigos/Artigo-DividasCaras/DividasCaras";
import Investir from "./screens/Artigos/Artigo-Investir/Investir";
import InvestmentPage from "./screens/InvestimentPage/InvestimentPage";
import StocksPage from "./screens/StocksPage/StocksPage";
import TipsInvestmentPage from "./screens/TipsInvestimentPage/TipsInvestimentPage";

function App() {
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/suaRenda" element={<ArtigoRenda />} />

        <Route path="/reserva" element={<ArtigoReserva />} />

        <Route path="/regra50" element={<ArtigoRegra />} />

        <Route path="/cortarGastos" element={<CortarGastos />} />

        <Route path="/dividas" element={<DividasCaras />} />

        <Route path="/investir" element={<Investir />} />

        <Route path="/upgrade" element={<UpgradePage />} />

        <Route path="/sigin" element={<RegistrationPage />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/principal" element={<PrincipalPage />} />

        <Route path="/investimento" element={<InvestmentPage />} />

        <Route path="/acoes" element={<StocksPage />} />

        <Route path="/dicas-investimentos" element={<TipsInvestmentPage />} />
      </Routes>
    </>
  );
}

export default App;
