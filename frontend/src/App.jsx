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

function App() {
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/suaRenda" element={<ArtigoRenda />} />

        <Route path="/reserva" element={<ArtigoReserva />} />

        <Route path="/regra50" element={<ArtigoRegra />} />

        <Route path="/upgrade" element={<UpgradePage />} />

        <Route path="/sigin" element={<RegistrationPage />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/principal" element={<PrincipalPage />} />
      </Routes>
    </>
  );
}

export default App;
