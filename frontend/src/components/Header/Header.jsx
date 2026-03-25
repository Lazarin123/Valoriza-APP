import React, { useState } from "react";
import "./Header.scss";
// Certifique-se de que o caminho da Sidebar e da imagem estão corretos
import Sidebar from "../SideBar/SideBar";
import logoIcon from "../../assets/images/ValorizaApp.png";

const Header = () => {
  // Lógica de estado encapsulada no Header
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Header.jsx
  return (
    <>
      <header className="header">
        <div className="header__content">
          {" "}
          <div className="header__logo-wrapper">
            <img src={logoIcon} alt="Logo" className="header__logo-img" />
            <h1 className="header__logo-text">VALORIZA APP</h1>
          </div>
          <button
            className={`header__hamburger ${isSidebarOpen ? "header__hamburger--open" : ""}`}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
