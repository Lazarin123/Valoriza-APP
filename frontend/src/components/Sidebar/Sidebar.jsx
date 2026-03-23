import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Info,
  Wallet,
  TrendingUp,
  Lock,
  LogOut,
} from "lucide-react";
import "./SideBar.scss";
import logoIcon from "../../assets/images/ValorizaApp.png"; // Caminho da logo

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/principal",
    },
    { icon: <Info size={20} />, label: "Sobre Nós", path: "/about" },
    {
      icon: <Wallet size={20} />,
      label: "Investimentos",
      path: "/investimentos",
    },
    { icon: <TrendingUp size={20} />, label: "Upgrade", path: "/upgrade" },
    { icon: <LogOut size={20} />, label: "Sair", path: "/" },
  ];

  return (
    <>
      {/* Overlay: Fundo escurecido que aparece atrás da sidebar */}
      <div
        className={`sidebar-overlay ${isOpen ? "sidebar-overlay--open" : ""}`}
        onClick={onClose} // Fecha ao clicar no fundo
      />

      {/* Sidebar propriamente dita */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__logo-container">
          <img
            src={logoIcon}
            alt="Valoriza Logo"
            className="sidebar__logo-img"
          />
          <span className="sidebar__logo-text">VALORIZA APP</span>
        </div>

        <nav className="sidebar__nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="sidebar__link"
              onClick={onClose}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              <span className="sidebar__link-text">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Card de Upgrade */}
        <div className="sidebar__upgrade-card">
          <h4 className="sidebar__upgrade-title">Assine o plano</h4>
          <p className="sidebar__upgrade-description">
            Tenha acessos ilimitados e viva sua melhor experiência financeira.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
