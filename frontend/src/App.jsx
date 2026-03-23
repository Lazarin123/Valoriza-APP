import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage/loginPage";
import AboutUs from "./screens/AboutUs/AboutUs";

function App() {
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
