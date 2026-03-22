import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className="flex flex-row">
      <div className="flex flex-col justify-between items-center px-36">
        <div className="flex flex-col my-auto justify-center items-center ">
          <div className=" flex gap-5 w-full max-w-md mt- flex-col items-center justify-center">
            <h1 className="text-4xl whitespace-nowrap text-[#2B3674] text-center font-bold">
              Olá, Seja Bem Vindo de volta!
            </h1>
            <p className="text-sm text-center text-[#A3AED0]">
              Transforme sua jornada Financeira
            </p>
            <button className="rounded-2xl h-12 w-full flex flex-row justify-center items-center gap-3 text-base font-bold shadow-black bg-[#f1f1f1]">
              <img
                src="\frontend\src\assets\icons\google.svg"
                alt="google iconF"
              />
              Entrar com o Google
            </button>
          </div>
          <div className="flex mt-9 flex-row items-center justify-around w-full max-w-md">
            <div className="line_separator"></div>
            <p className="text-2xl text-gray-400">Ou</p>
            <div className="line_separator"></div>
          </div>
          <form className="max-w-md flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2.5 text-start">
              <label
                className="font-bold text-start pl-2 text-sm"
                htmlFor="name"
              >
                Name *
              </label>
              <input
                type="text"
                className="border border-black rounded-2xl h-11 px-4 py-3"
                placeholder="Seu Nome"
              />
            </div>
            <div className="flex flex-col gap-2.5 text-start">
              <label
                className="font-bold text-start pl-2 text-sm"
                htmlFor="name"
              >
                Email *
              </label>
              <input
                type="text"
                className="border border-black rounded-2xl h-11 px-4 py-3"
                placeholder="seuemail@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2.5 text-start">
              <label
                className="font-bold text-start pl-2 text-sm"
                htmlFor="name"
              >
                Senha *
              </label>
              <input
                type="text"
                className="border border-black rounded-2xl h-11 px-4 py-3"
                placeholder="Min. 8 characters"
              />
            </div>
            <button className="border w-full rounded-2xl shadow-2xl bg-[#FD7E15] text-white h-12">
              Entrar
            </button>
            <p className="text-sm text-start text-[#A3AED0]">
              Ainda não tem uma conta?{" "}
              <span className="text-[#FD7E15]">
                <Link to="/signin">Vamos Criar uma!</Link>
              </span>
            </p>
          </form>
        </div>
        <p>
          © 2026 Termos de uso a{" "}
          <span className="text-[#FD7E15]">Valoriza App.</span>
        </p>
      </div>
      <div className="w-full display_bg relative">
        <div className="flex flex-col h-full justify-center items-center">
          <img
            className="size-56"
            src="\frontend\src\assets\images\ValorizaApp.png"
            alt="Valoriza logo"
          />
          <p className="text-sm mb-4 text-white text-center">
            Seu dinheiro merece o nosso cuidado!
          </p>
          <button className="border w-52  text-white rounded-2xl text-center border-white">
            <span className="text-xs">Conheça mais sobre a gente.</span>
            <br />
            <div className="flex relative justify-center">
              <span className="text-base">Clique aqui</span>{" "}
              <img
                className="rotate-90 absolute right-9 size-6"
                src="\frontend\src\assets\icons\arrowup.png"
                alt=""
              />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
