import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </>
  );
}

export default App;
