import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Button.scss";

const Button = ({ text = "Começar a Investir", to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Se houver uma rota definida, navega para ela
    if (to) {
      navigate(to);
    }
    // Se houver uma função onClick extra, executa-a
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className="cta-button" onClick={handleClick} type="button">
      <span className="cta-button__text">{text}</span>
      <div className="cta-button__icon-wrapper">
        <ArrowRight size={20} color="#FFF" strokeWidth={2.5} />
      </div>
    </button>
  );
};

export default Button;
