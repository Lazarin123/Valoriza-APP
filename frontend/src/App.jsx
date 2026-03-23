import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage/loginPage";
import RegistrationPage from "./screens/RegistrationPage/RegistrationPage";
import AboutUs from "./screens/AboutUs/AboutUs";

function App() {
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sigin" element={<RegistrationPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
