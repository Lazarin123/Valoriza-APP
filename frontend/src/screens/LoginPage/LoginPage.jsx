// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import videoBg from "../../assets/videos/LoginPageVideo.mp4";

// const LoginPage = () => {
//   // Estado para controlar a visibilidade da senha
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <main className="flex flex-row">
//       <div className="flex flex-col justify-between items-center px-36">
//         <div className="flex flex-col my-auto justify-center items-center ">
//           <div className=" flex gap-5 w-full max-w-md mt- flex-col items-center justify-center">
//             <h1 className="text-4xl whitespace-nowrap text-[#2B3674] text-center font-bold">
//               Olá, Seja Bem Vindo ao Valoriza!
//             </h1>
//             <p className="text-sm text-center text-[#A3AED0]">
//               Transforme sua jornada Financeira!
//             </p>
//             <button className="rounded-2xl h-15 w-full flex flex-row justify-center items-center gap-3 text-base font-bold shadow-black bg-[#f1f1f1]">
//               O futuro financeiro que você sempre planejou começa aqui.
//             </button>
//           </div>
//           <div className="flex mt-9 flex-row items-center justify-around w-full max-w-md">
//             <div className="line_separator"></div>
//             <p className="text-2xl text-gray-400">Entrar</p>
//             <div className="line_separator"></div>
//           </div>
//           <form className="max-w-md flex flex-col gap-5 w-full">
//             <div className="flex flex-col gap-2.5 text-start">
//               <label
//                 className="font-bold text-start pl-2 text-sm"
//                 htmlFor="email"
//               >
//                 Email *
//               </label>
//               <input
//                 type="text"
//                 className="border border-black bg-white rounded-2xl h-11 px-4 py-3"
//                 placeholder="seuemail@gmail.com"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-2.5 text-start">
//               <label
//                 className="font-bold text-start pl-2 text-sm"
//                 htmlFor="password"
//               >
//                 Senha *
//               </label>
//               <div className="relative w-full">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="border border-black bg-white rounded-2xl h-11 px-4 py-3 w-full"
//                   placeholder="Min. 8 characters"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-4 top-3 text-gray-500 hover:text-gray-800"
//                 >
//                   {showPassword ? "👁️" : "🙈"}
//                 </button>
//               </div>
//             </div>

//             <Link to="/principal">
//               <button className="border w-full rounded-2xl hover:bg-[#e66d0d] shadow-2xl bg-[#FD7E15] text-white h-12 cursor-pointer">
//                 Entrar
//               </button>
//             </Link>
//             <p className="text-sm text-start text-[#A3AED0]">
//               Ainda não tem uma conta?{" "}
//               <span className="text-[#FD7E15]">
//                 <Link to="/sigin">Vamos Criar uma!</Link>
//               </span>
//             </p>
//           </form>
//         </div>
//         <p>
//           © 2026 Termos de uso a{" "}
//           <span className="text-[#FD7E15]">Valoriza App.</span>
//         </p>
//       </div>

//       <div className="w-full display_bg relative">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover -z-10"
//         >
//           <source src={videoBg} type="video/mp4" />
//         </video>

//         <div className="flex flex-col h-full justify-center items-center">
//           <img
//             className="size-56"
//             src="\frontend\src\assets\images\ValorizaApp.png"
//             alt="Valoriza logo"
//           />
//           <p className="text-sm mb-4 text-white text-center">
//             Seu dinheiro merece o nosso cuidado!
//           </p>
//           <button className="border w-52  hover:bg-[#ffffff40] hover:text-[#ffffff] text-white rounded-2xl text-center border-white">
//             <span className="text-xs">Conheça mais sobre a gente.</span>
//             <br />
//             <Link to="/about" className="flex relative justify-center">
//               <span className="text-base">Clique aqui</span>{" "}
//               <img
//                 className="rotate-90 absolute right-9 size-6"
//                 src="\frontend\src\assets\icons\arrowup.png"
//                 alt=""
//               />
//             </Link>
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService.js"; // Importando a conexão com a API
import videoBg from "../../assets/videos/LoginPageVideo.mp4";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Novos estados para controlar o formulário
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Chamada para o back-end
      const response = await authService.login(formData);

      // Salva o token recebido
      localStorage.setItem("token", response.data.token);

      alert("Login realizado com sucesso!");
      navigate("/principal");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Erro ao fazer login. Verifique seus dados.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex flex-row">
      <div className="flex flex-col justify-between items-center px-36">
        <div className="flex flex-col my-auto justify-center items-center ">
          <div className=" flex gap-5 w-full max-w-md mt- flex-col items-center justify-center">
            <h1 className="text-4xl whitespace-nowrap text-[#2B3674] text-center font-bold">
              Olá, Seja Bem Vindo ao Valoriza!
            </h1>
            <p className="text-sm text-center text-[#A3AED0]">
              Transforme sua jornada Financeira!
            </p>
            <button className="rounded-2xl h-15 w-full flex flex-row justify-center items-center gap-3 text-base font-bold shadow-black bg-[#f1f1f1]">
              O futuro financeiro que você sempre planejou começa aqui.
            </button>
          </div>
          <div className="flex mt-9 flex-row items-center justify-around w-full max-w-md">
            <div className="line_separator"></div>
            <p className="text-2xl text-gray-400">Entrar</p>
            <div className="line_separator"></div>
          </div>

          <form
            onSubmit={handleLogin}
            className="max-w-md flex flex-col gap-5 w-full"
          >
            <div className="flex flex-col gap-2.5 text-start">
              <label
                className="font-bold text-start pl-2 text-sm"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-black bg-white rounded-2xl h-11 px-4 py-3"
                placeholder="seuemail@gmail.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5 text-start">
              <label
                className="font-bold text-start pl-2 text-sm"
                htmlFor="password"
              >
                Senha *
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-black bg-white rounded-2xl h-11 px-4 py-3 w-full"
                  placeholder="Min. 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="border w-full rounded-2xl hover:bg-[#e66d0d] shadow-2xl bg-[#FD7E15] text-white h-12 cursor-pointer"
            >
              {isProcessing ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-sm text-start text-[#A3AED0]">
              Ainda não tem uma conta?{" "}
              <span className="text-[#FD7E15]">
                <Link to="/sigin">Vamos Criar uma!</Link>
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="flex flex-col h-full justify-center items-center">
          <img
            className="size-56"
            src="\frontend\src\assets\images\ValorizaApp.png"
            alt="Valoriza logo"
          />
          <p className="text-sm mb-4 text-white text-center">
            Seu dinheiro merece o nosso cuidado!
          </p>
          <button className="border w-52  hover:bg-[#ffffff40] hover:text-[#ffffff] text-white rounded-2xl text-center border-white">
            <span className="text-xs">Conheça mais sobre a gente.</span>
            <br />
            <Link to="/about" className="flex relative justify-center">
              <span className="text-base">Clique aqui</span>{" "}
              <img
                className="rotate-90 absolute right-9 size-6"
                src="\frontend\src\assets\icons\arrowup.png"
                alt=""
              />
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
