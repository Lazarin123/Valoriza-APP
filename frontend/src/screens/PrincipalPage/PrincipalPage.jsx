// // Imports
// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Zap,
//   Trash2,
//   Edit3,
//   X,
//   TrendingUp,
//   DollarSign,
//   BarChart2,
//   Sun,
//   Moon,
// } from "lucide-react";
// import Header from "../../components/Header/Header";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   Cell,
//   Legend,
// } from "recharts";
// import "./PrincipalPage.scss";
// import Footer from "../../components/Footer/Footer";
// import DicasSection from "../../components/Dicas/DicasSection";
// import Button from "../../components/Button/Button";

// const PrincipalPage = () => {
//   const userId = "samuel_vallis_user";

//   const [gastosFixos, setGastosFixos] = useState([]);

//   useEffect(() => {
//     const carregarDados = async () => {
//       try {
//         const res = await api.get("/api/gastos/fixos"); // Chama a rota privada
//         setGastosFixos(res.data);
//       } catch (err) {
//         console.error("Erro ao carregar dados privados");
//       }
//     };
//     carregarDados();
//   }, []);

//   // --- TOGGLE DARK MODE ---
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem(`${userId}_theme`) === "dark";
//   });

//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add("dark-theme");
//       localStorage.setItem(`${userId}_theme`, "dark");
//     } else {
//       document.body.classList.remove("dark-theme");
//       localStorage.setItem(`${userId}_theme`, "light");
//     }
//   }, [isDarkMode]);
//   // -------------------------

//   // --- ESTADOS ---
//   const [salario, setSalario] = useState(() => {
//     const saved = localStorage.getItem(`${userId}_salario`);
//     return saved ? parseFloat(saved) : 0;
//   });

//   const [gastosFixos, setGastosFixos] = useState(() => {
//     const saved = localStorage.getItem(`${userId}_gastos`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [gastosVariaveis, setGastosVariaveis] = useState(() => {
//     const saved = localStorage.getItem(`${userId}_gastos_variaveis`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Controles de Modal
//   const [showModalGasto, setShowModalGasto] = useState(false);
//   const [showModalVariavel, setShowModalVariavel] = useState(false);
//   const [showModalSalario, setShowModalSalario] = useState(false);
//   const [showVerTodos, setShowVerTodos] = useState(null); // 'fixos' ou 'variaveis'

//   // Dados Auxiliares
//   const [editandoId, setEditandoId] = useState(null);
//   const [tempSalario, setTempSalario] = useState("");
//   const [formData, setFormData] = useState({ nome: "", valor: "", dia: "" });

//   // --- PERSISTÊNCIA ---
//   useEffect(() => {
//     localStorage.setItem(`${userId}_salario`, salario);
//     localStorage.setItem(`${userId}_gastos`, JSON.stringify(gastosFixos));
//     localStorage.setItem(
//       `${userId}_gastos_variaveis`,
//       JSON.stringify(gastosVariaveis),
//     );
//   }, [salario, gastosFixos, gastosVariaveis]);

//   // --- CÁLCULOS ---
//   const totais = useMemo(() => {
//     const fixosPagos = gastosFixos
//       .filter((g) => g.pago)
//       .reduce((acc, g) => acc + g.valor, 0);
//     const varTotal = gastosVariaveis.reduce((acc, g) => acc + g.valor, 0);
//     return {
//       pago: fixosPagos,
//       variaveis: varTotal,
//       economizado: salario - fixosPagos - varTotal,
//     };
//   }, [gastosFixos, gastosVariaveis, salario]);

//   // --- FUNÇÕES DE AÇÃO ---
//   const handleSalvarSalario = (e) => {
//     e.preventDefault();
//     setSalario(parseFloat(tempSalario) || 0);
//     setShowModalSalario(false);
//   };

//   const handleSalvarGastoFixo = (e) => {
//     e.preventDefault();
//     const novo = {
//       id: editandoId || Date.now(),
//       nome: formData.nome,
//       valor: parseFloat(formData.valor),
//       dia: formData.dia,
//       pago: editandoId
//         ? gastosFixos.find((g) => g.id === editandoId).pago
//         : false,
//     };
//     setGastosFixos(
//       editandoId
//         ? gastosFixos.map((g) => (g.id === editandoId ? novo : g))
//         : [...gastosFixos, novo],
//     );
//     setShowModalGasto(false);
//     setEditandoId(null);
//   };

//   const handleSalvarVariavel = (e) => {
//     e.preventDefault();
//     const novo = {
//       id: Date.now(),
//       nome: formData.nome,
//       valor: parseFloat(formData.valor),
//       dia: formData.dia || new Date().getDate().toString(),
//     };
//     setGastosVariaveis([...gastosVariaveis, novo]);
//     setShowModalVariavel(false);
//     setFormData({ nome: "", valor: "", dia: "" });
//   };

//   const excluirGasto = (id, tipo) => {
//     if (tipo === "fixos")
//       setGastosFixos(gastosFixos.filter((g) => g.id !== id));
//     else setGastosVariaveis(gastosVariaveis.filter((g) => g.id !== id));
//   };

//   return (
//     <>
//       <Header />

//       {/* --- BOTÃO FLUTUANTE DARK MODE --- */}
//       <button
//         className="dark-mode-btn"
//         onClick={() => setIsDarkMode(!isDarkMode)}
//         title="Alternar Tema"
//       >
//         {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
//       </button>

//       <div className="dashboard-wrapper">
//         <main className="content-container">
//           {/* Stat Cards */}
//           <section className="stats-grid">
//             <div className="stat-card">
//               <div className="icon blue">
//                 <BarChart2 size={20} />
//               </div>
//               <div className="details">
//                 <p>Salário base</p>
//                 <h3>
//                   R${" "}
//                   {salario.toLocaleString("pt-BR", {
//                     minimumFractionDigits: 2,
//                   })}
//                 </h3>
//                 <button
//                   className="edit-link"
//                   onClick={() => {
//                     setTempSalario(salario);
//                     setShowModalSalario(true);
//                   }}
//                 >
//                   Entrada
//                 </button>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="icon light-blue">
//                 <DollarSign size={20} />
//               </div>
//               <div className="details">
//                 <p>Total Saída</p>
//                 <h3 className="danger">
//                   -R$ {(totais.pago + totais.variaveis).toFixed(2)}
//                 </h3>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="icon green">
//                 <TrendingUp size={20} />
//               </div>
//               <div className="details">
//                 <p>Saldo Livre</p>
//                 <h3 className="success">R$ {totais.economizado.toFixed(2)}</h3>
//               </div>
//             </div>
//           </section>

//           {/* Grid de Gastos Fixos */}
//           <div className="main-layout-grid">
//             <section className="report-card">
//               <div className="card-header">
//                 <h4>Gastos Fixos</h4>
//                 <button
//                   className="add-btn-clean"
//                   onClick={() => {
//                     setEditandoId(null);
//                     setFormData({ nome: "", valor: "", dia: "" });
//                     setShowModalGasto(true);
//                   }}
//                 >
//                   Add Novo Gasto Fixo +
//                 </button>
//               </div>
//               <div className="list-container">
//                 {gastosFixos.slice(0, 4).map((g) => (
//                   <div key={g.id} className="item-row">
//                     <span className="name">{g.nome}</span>
//                     <div className="spacer-line"></div>
//                     <span className={`price ${g.pago ? "success" : "danger"}`}>
//                       R$ {g.valor.toFixed(2)}
//                     </span>
//                     <div
//                       className={`toggle-switch ${g.pago ? "active" : ""}`}
//                       onClick={() =>
//                         setGastosFixos(
//                           gastosFixos.map((x) =>
//                             x.id === g.id ? { ...x, pago: !x.pago } : x,
//                           ),
//                         )
//                       }
//                     >
//                       <div className="thumb"></div>
//                       <span className="label-text">
//                         {g.pago ? "Pago" : "Pendente"}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 className="btn-main-orange"
//                 onClick={() => setShowVerTodos("fixos")}
//               >
//                 VER TODOS FIXOS
//               </button>
//             </section>

//             <section className="chart-card">
//               <h4>Histórico Fixo</h4>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={gastosFixos.slice(-5)}>
//                   <XAxis dataKey="nome" hide />
//                   <Tooltip />
//                   <Bar
//                     dataKey="valor"
//                     fill="#2B3674"
//                     radius={[5, 5, 0, 0]}
//                     barSize={12}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </section>
//           </div>

//           {/* Grid de Gastos Variáveis */}
//           <div className="main-layout-grid" style={{ marginTop: "30px" }}>
//             <section className="report-card">
//               <div className="card-header">
//                 <h4>Gastos Variáveis</h4>
//                 <button
//                   className="add-btn-clean"
//                   onClick={() => setShowModalVariavel(true)}
//                 >
//                   Add Novo Gasto Variável +
//                 </button>
//               </div>
//               <div className="list-container">
//                 {gastosVariaveis.slice(0, 4).map((g) => (
//                   <div key={g.id} className="item-row">
//                     <span className="name">{g.nome}</span>
//                     <div className="spacer-line"></div>
//                     <span className="price danger">
//                       -R$ {g.valor.toFixed(2)}
//                     </span>
//                     <span className="date-label">Dia {g.dia}</span>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 className="btn-main-orange"
//                 onClick={() => setShowVerTodos("variaveis")}
//               >
//                 VER TODOS VARIÁVEIS
//               </button>
//               {totais.variaveis > 0 && (
//                 <div className="alert-banner-danger">
//                   Total Variável: R$ {totais.variaveis.toFixed(2)}
//                 </div>
//               )}
//             </section>

//             <section className="chart-card warning-style">
//               <h4>Análise de Itens</h4>
//               <ResponsiveContainer width="100%" height={180}>
//                 <BarChart data={gastosVariaveis.slice(-6)}>
//                   <XAxis
//                     dataKey="nome"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 10 }}
//                   />
//                   <Tooltip cursor={{ fill: "#f4f7fe" }} />
//                   <Legend iconType="circle" />
//                   <Bar
//                     name="Valor do Item"
//                     dataKey="valor"
//                     radius={[10, 10, 0, 0]}
//                     barSize={8}
//                   >
//                     {gastosVariaveis.map((_, i) => (
//                       <Cell
//                         key={i}
//                         fill={i % 2 === 0 ? "#FD7E15" : "#05CD99"}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//               <div className="stats-mini-list">
//                 <div className="mini-stat blue-light">
//                   Maior: R${" "}
//                   {Math.max(...gastosVariaveis.map((g) => g.valor), 0).toFixed(
//                     2,
//                   )}
//                 </div>
//                 <div className="mini-stat red-light">
//                   Menor: R${" "}
//                   {Math.min(...gastosVariaveis.map((g) => g.valor), 0).toFixed(
//                     2,
//                   )}
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* --- SEÇÃO DE DICAS FINANCEIRAS --- */}
//           <DicasSection />
//           <Button text="Começar a Investir" to="/investimento" />
//         </main>

//         {/* --- MODAIS --- */}
//         {showModalSalario && (
//           <div className="modal-overlay">
//             <div className="modal-content small">
//               <h3>Novo Salário</h3>
//               <form onSubmit={handleSalvarSalario}>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={tempSalario}
//                   onChange={(e) => setTempSalario(e.target.value)}
//                   autoFocus
//                 />
//                 <button type="submit" className="btn-save">
//                   Atualizar
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowModalSalario(false)}
//                 >
//                   Cancelar
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {showModalGasto && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h3>{editandoId ? "Editar Gasto Fixo" : "Novo Gasto Fixo"}</h3>
//               <form onSubmit={handleSalvarGastoFixo}>
//                 <input
//                   placeholder="Nome"
//                   value={formData.nome}
//                   onChange={(e) =>
//                     setFormData({ ...formData, nome: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Valor"
//                   value={formData.valor}
//                   onChange={(e) =>
//                     setFormData({ ...formData, valor: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   placeholder="Dia Vencimento"
//                   value={formData.dia}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dia: e.target.value })
//                   }
//                 />
//                 <button type="submit" className="btn-save">
//                   Confirmar
//                 </button>
//                 <button type="button" onClick={() => setShowModalGasto(false)}>
//                   Fechar
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {showModalVariavel && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h3>Novo Gasto Variável</h3>
//               <form onSubmit={handleSalvarVariavel}>
//                 <input
//                   placeholder="O que comprou?"
//                   value={formData.nome}
//                   onChange={(e) =>
//                     setFormData({ ...formData, nome: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Valor R$"
//                   value={formData.valor}
//                   onChange={(e) =>
//                     setFormData({ ...formData, valor: e.target.value })
//                   }
//                   required
//                 />
//                 <button type="submit" className="btn-save">
//                   Adicionar Agora
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowModalVariavel(false)}
//                 >
//                   Voltar
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {showVerTodos && (
//           <div className="modal-overlay">
//             <div className="modal-content ver-todos-modal">
//               <div className="modal-header">
//                 <h3>
//                   {showVerTodos === "fixos"
//                     ? "Todos os Fixos"
//                     : "Todos os Variáveis"}
//                 </h3>
//                 <X onClick={() => setShowVerTodos(null)} cursor="pointer" />
//               </div>
//               <div className="full-list">
//                 {(showVerTodos === "fixos" ? gastosFixos : gastosVariaveis).map(
//                   (g) => (
//                     <div key={g.id} className="full-item-row">
//                       <span>
//                         {g.nome} - R$ {g.valor.toFixed(2)}
//                       </span>
//                       <button
//                         onClick={() => excluirGasto(g.id, showVerTodos)}
//                         className="del"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PrincipalPage;

// Imports
import React, { useState, useMemo, useEffect } from "react";
import {
  Zap,
  Trash2,
  Edit3,
  X,
  TrendingUp,
  DollarSign,
  BarChart2,
  Sun,
  Moon,
} from "lucide-react";
import Header from "../../components/Header/Header";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import "./PrincipalPage.scss";
import Footer from "../../components/Footer/Footer";
import DicasSection from "../../components/Dicas/DicasSection";
import Button from "../../components/Button/Button";

const PrincipalPage = () => {
  // Estados sem o userId para evitar conflitos de cache
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [salario, setSalario] = useState(
    () => parseFloat(localStorage.getItem("salario")) || 0,
  );
  const [gastosFixos, setGastosFixos] = useState(
    () => JSON.parse(localStorage.getItem("gastos")) || [],
  );
  const [gastosVariaveis, setGastosVariaveis] = useState(
    () => JSON.parse(localStorage.getItem("gastos_variaveis")) || [],
  );

  const [showModalGasto, setShowModalGasto] = useState(false);
  const [showModalVariavel, setShowModalVariavel] = useState(false);
  const [showModalSalario, setShowModalSalario] = useState(false);
  const [showVerTodos, setShowVerTodos] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [tempSalario, setTempSalario] = useState("");
  const [formData, setFormData] = useState({ nome: "", valor: "", dia: "" });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("salario", salario);
    localStorage.setItem("gastos", JSON.stringify(gastosFixos));
    localStorage.setItem("gastos_variaveis", JSON.stringify(gastosVariaveis));
    if (isDarkMode) document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  }, [isDarkMode, salario, gastosFixos, gastosVariaveis]);

  const totais = useMemo(() => {
    const fixosPagos = gastosFixos
      .filter((g) => g.pago)
      .reduce((acc, g) => acc + g.valor, 0);
    const varTotal = gastosVariaveis.reduce((acc, g) => acc + g.valor, 0);
    return {
      pago: fixosPagos,
      variaveis: varTotal,
      economizado: salario - fixosPagos - varTotal,
    };
  }, [gastosFixos, gastosVariaveis, salario]);

  const handleSalvarSalario = (e) => {
    e.preventDefault();
    setSalario(parseFloat(tempSalario) || 0);
    setShowModalSalario(false);
  };
  const handleSalvarGastoFixo = (e) => {
    e.preventDefault();
    const novo = {
      id: editandoId || Date.now(),
      nome: formData.nome,
      valor: parseFloat(formData.valor),
      dia: formData.dia,
      pago: editandoId
        ? gastosFixos.find((g) => g.id === editandoId).pago
        : false,
    };
    setGastosFixos(
      editandoId
        ? gastosFixos.map((g) => (g.id === editandoId ? novo : g))
        : [...gastosFixos, novo],
    );
    setShowModalGasto(false);
    setEditandoId(null);
  };
  const handleSalvarVariavel = (e) => {
    e.preventDefault();
    const novo = {
      id: Date.now(),
      nome: formData.nome,
      valor: parseFloat(formData.valor),
      dia: formData.dia || new Date().getDate().toString(),
    };
    setGastosVariaveis([...gastosVariaveis, novo]);
    setShowModalVariavel(false);
    setFormData({ nome: "", valor: "", dia: "" });
  };
  const excluirGasto = (id, tipo) => {
    if (tipo === "fixos")
      setGastosFixos(gastosFixos.filter((g) => g.id !== id));
    else setGastosVariaveis(gastosVariaveis.filter((g) => g.id !== id));
  };

  return (
    <>
      <Header />
      <button
        className="dark-mode-btn"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <div className="dashboard-wrapper">
        <main className="content-container">
          <section className="stats-grid">
            <div className="stat-card">
              <div className="icon blue">
                <BarChart2 size={20} />
              </div>
              <div className="details">
                <p>Salário base</p>
                <h3>R$ {salario.toFixed(2)}</h3>
                <button
                  className="edit-link"
                  onClick={() => {
                    setTempSalario(salario);
                    setShowModalSalario(true);
                  }}
                >
                  Entrada
                </button>
              </div>
            </div>
            <div className="stat-card">
              <div className="icon light-blue">
                <DollarSign size={20} />
              </div>
              <div className="details">
                <p>Total Saída</p>
                <h3 className="danger">
                  -R$ {(totais.pago + totais.variaveis).toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="icon green">
                <TrendingUp size={20} />
              </div>
              <div className="details">
                <p>Saldo Livre</p>
                <h3 className="success">R$ {totais.economizado.toFixed(2)}</h3>
              </div>
            </div>
          </section>

          <div className="main-layout-grid">
            <section className="report-card">
              <div className="card-header">
                <h4>Gastos Fixos</h4>
                <button
                  className="add-btn-clean"
                  onClick={() => {
                    setShowModalGasto(true);
                  }}
                >
                  Add Novo +
                </button>
              </div>
              <div className="list-container">
                {gastosFixos.slice(0, 4).map((g) => (
                  <div key={g.id} className="item-row">
                    <span className="name">{g.nome}</span>
                    <span className="price">R$ {g.valor.toFixed(2)}</span>
                    <div
                      className={`toggle-switch ${g.pago ? "active" : ""}`}
                      onClick={() =>
                        setGastosFixos(
                          gastosFixos.map((x) =>
                            x.id === g.id ? { ...x, pago: !x.pago } : x,
                          ),
                        )
                      }
                    >
                      Pagar
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-main-orange"
                onClick={() => setShowVerTodos("fixos")}
              >
                VER TODOS FIXOS
              </button>
            </section>
            <section className="chart-card">
              <h4>Histórico Fixo</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={gastosFixos.slice(-5)}>
                  <Bar
                    dataKey="valor"
                    fill="#2B3674"
                    radius={[5, 5, 0, 0]}
                    barSize={15} // <--- Aumente este número para deixar mais grosso, diminua para mais fino
                  />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>

          <div className="main-layout-grid" style={{ marginTop: "30px" }}>
            <section className="report-card">
              <div className="card-header">
                <h4>Gastos Variáveis</h4>
                <button
                  className="add-btn-clean"
                  onClick={() => setShowModalVariavel(true)}
                >
                  Add Novo +
                </button>
              </div>
              <div className="list-container">
                {gastosVariaveis.slice(0, 4).map((g) => (
                  <div key={g.id} className="item-row">
                    <span className="name">{g.nome}</span>
                    <span className="price danger">
                      -R$ {g.valor.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="btn-main-orange"
                onClick={() => setShowVerTodos("variaveis")}
              >
                VER TODOS VARIÁVEIS
              </button>
            </section>
            <section className="chart-card warning-style">
              <h4>Análise Variáveis</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={gastosVariaveis.slice(-6)}>
                  <Bar
                    dataKey="valor"
                    fill="#ffa500"
                    radius={[5, 5, 0, 0]}
                    barSize={15} // <--- Aumente este número para deixar mais grosso, diminua para mais fino
                  />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>
          <DicasSection />
          <Button text="Começar a Investir" to="/investimento" />
        </main>

        {/* MODAIS */}
        {showModalSalario && (
          <div className="modal-overlay">
            <div className="modal-content small">
              <h3>Salário</h3>
              <form onSubmit={handleSalvarSalario}>
                <input
                  type="number"
                  value={tempSalario}
                  onChange={(e) => setTempSalario(e.target.value)}
                />
                <button type="submit">Atualizar</button>
              </form>
            </div>
          </div>
        )}
        {showModalGasto && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Gasto Fixo</h3>
              <form onSubmit={handleSalvarGastoFixo}>
                <input
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                />
                <button type="submit">Salvar</button>
              </form>
            </div>
          </div>
        )}
        {showModalVariavel && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Gasto Variável</h3>
              <form onSubmit={handleSalvarVariavel}>
                <input
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                />
                <button type="submit">Salvar</button>
              </form>
            </div>
          </div>
        )}
        {showVerTodos && (
          <div className="modal-overlay">
            <div className="modal-content ver-todos-modal">
              <div className="modal-header">
                <h3>Listagem</h3>
                <X onClick={() => setShowVerTodos(null)} />
              </div>
              <div className="full-list">
                {(showVerTodos === "fixos" ? gastosFixos : gastosVariaveis).map(
                  (g) => (
                    <div key={g.id} className="full-item-row">
                      <span>{g.nome}</span>
                      <button onClick={() => excluirGasto(g.id, showVerTodos)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default PrincipalPage;
