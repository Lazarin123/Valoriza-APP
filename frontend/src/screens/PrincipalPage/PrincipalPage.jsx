import React, { useState, useMemo, useEffect } from "react";
import {
  Zap,
  Trash2,
  Edit3,
  X,
  TrendingUp,
  DollarSign,
  BarChart2,
} from "lucide-react";
import Header from "../../components/Header/Header";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  YAxis,
} from "recharts";
import "./PrincipalPage.scss";

const PrincipalPage = () => {
  // IDENTIFICADOR ÚNICO (Quando tiver o login, esse ID virá da API)
  const userId = "samuel_vallis_user";

  const [userName, setUserName] = useState(() => {
    const savedName = localStorage.getItem(`${userId}_name`);
    return savedName || "Usuário"; // "Usuário" é o padrão caso não tenha nada salvo
  });

  // ESTADOS INICIALIZADOS COM O LOCALSTORAGE (Para não começar do zero se já houver dados)
  const [salario, setSalario] = useState(() => {
    const savedSalario = localStorage.getItem(`${userId}_salario`);
    return savedSalario ? parseFloat(savedSalario) : 0;
  });

  const [gastosFixos, setGastosFixos] = useState(() => {
    const savedGastos = localStorage.getItem(`${userId}_gastos`);
    return savedGastos ? JSON.parse(savedGastos) : [];
  });

  const [showModalGasto, setShowModalGasto] = useState(false);
  const [showModalSalario, setShowModalSalario] = useState(false);
  const [showVerTodos, setShowVerTodos] = useState(false);

  const [editandoGastoId, setEditandoGastoId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", valor: "", dia: "" });
  const [tempSalario, setTempSalario] = useState("");

  // SALVAMENTO AUTOMÁTICO (Sempre que mudar o salário ou os gastos)
  useEffect(() => {
    localStorage.setItem(`${userId}_salario`, salario);
  }, [salario]);

  useEffect(() => {
    localStorage.setItem(`${userId}_gastos`, JSON.stringify(gastosFixos));
  }, [gastosFixos]);

  const totais = useMemo(() => {
    const pago = gastosFixos
      .filter((g) => g.pago)
      .reduce((acc, g) => acc + g.valor, 0);
    const economizado = salario - pago;
    return { pago, economizado };
  }, [gastosFixos, salario]);

  const toggleStatusPago = (id) => {
    setGastosFixos((prev) =>
      prev.map((g) => (g.id === id ? { ...g, pago: !g.pago } : g)),
    );
  };

  const handleOpenGasto = (gasto = null) => {
    if (gasto) {
      setEditandoGastoId(gasto.id);
      setFormData({ nome: gasto.nome, valor: gasto.valor, dia: gasto.dia });
    } else {
      setEditandoGastoId(null);
      setFormData({ nome: "", valor: "", dia: "" });
    }
    setShowModalGasto(true);
  };

  const salvarGasto = (e) => {
    e.preventDefault();
    const novoGasto = {
      id: editandoGastoId || Date.now(),
      nome: formData.nome,
      valor: parseFloat(formData.valor),
      dia: formData.dia,
      pago: editandoGastoId
        ? gastosFixos.find((g) => g.id === editandoGastoId).pago
        : false,
    };
    if (editandoGastoId) {
      setGastosFixos(
        gastosFixos.map((g) => (g.id === editandoGastoId ? novoGasto : g)),
      );
    } else {
      setGastosFixos([...gastosFixos, novoGasto]);
    }
    setShowModalGasto(false);
  };

  const atualizarSalario = (e) => {
    e.preventDefault();
    setSalario(parseFloat(tempSalario) || 0);
    setShowModalSalario(false);
  };

  return (
    <div className="dashboard-wrapper">
      <Header />
      <main className="content-container">
        <header className="main-header">
          <h1>
            Olá, {userName}{" "}
            <span className="sub">é ótimo ter você aqui com a gente!</span>
          </h1>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="icon blue">
              <BarChart2 size={20} />
            </div>
            <div className="details">
              <p>Salário base</p>
              <h3>
                R${" "}
                {salario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h3>
              <button
                className="edit-link"
                onClick={() => {
                  setTempSalario(salario);
                  setShowModalSalario(true);
                }}
              >
                Editar
              </button>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon light-blue">
              <DollarSign size={20} />
            </div>
            <div className="details">
              <p>Gastos Pagos</p>
              <h3 className="danger">
                -R${" "}
                {totais.pago.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon green">
              <TrendingUp size={20} />
            </div>
            <div className="details">
              <p>Saldo Restante</p>
              <h3 className="success">
                R${" "}
                {totais.economizado.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
          </div>
        </section>

        <div className="main-layout-grid">
          <section className="report-card">
            <div className="card-header">
              <h4>Relatório de gastos fixos</h4>
              <button
                className="add-btn-clean"
                onClick={() => handleOpenGasto()}
              >
                Adicionar gasto <Zap size={14} />
              </button>
            </div>

            <div className="list-container">
              {gastosFixos.length === 0 ? (
                <div className="empty-state">
                  Nenhum gasto adicionado ainda.
                </div>
              ) : (
                gastosFixos.slice(0, 5).map((g) => (
                  <div key={g.id} className="item-row">
                    <span className="name">{g.nome} :</span>
                    <div className="spacer-line"></div>
                    <span className={`price ${g.pago ? "success" : "danger"}`}>
                      R$ {g.valor.toFixed(2)}
                    </span>
                    <div
                      className={`toggle-switch ${g.pago ? "active" : ""}`}
                      onClick={() => toggleStatusPago(g.id)}
                    >
                      <div className="thumb"></div>
                      <span className="label-text">
                        {g.pago ? "Pago" : "Não pago"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              className="btn-main-orange"
              onClick={() => setShowVerTodos(true)}
            >
              VER TODOS
            </button>
          </section>

          <section className="chart-card">
            <h4>Resumo Visual</h4>
            <div className="chart-container">
              {gastosFixos.length > 0 && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={gastosFixos}>
                    <XAxis dataKey="nome" axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar dataKey="valor" radius={[10, 10, 0, 0]} barSize={35}>
                      {gastosFixos.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.pago ? "#05CD99" : "#EE5D50"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL VER TODOS */}
      {showVerTodos && (
        <div className="modal-overlay">
          <div className="modal-content ver-todos-modal">
            <div className="modal-header">
              <h2>Lista Completa de Gastos</h2>
              <X onClick={() => setShowVerTodos(false)} cursor="pointer" />
            </div>
            <div className="full-list">
              {gastosFixos.map((g) => (
                <div className="full-item-row" key={g.id}>
                  <div className="info">
                    <strong>{g.nome}</strong>
                    <span>
                      R$ {g.valor.toFixed(2)} - Dia {g.dia}
                    </span>
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => {
                        handleOpenGasto(g);
                        setShowVerTodos(false);
                      }}
                      className="edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setGastosFixos(gastosFixos.filter((x) => x.id !== g.id))
                      }
                      className="del"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR SALÁRIO */}
      {showModalSalario && (
        <div className="modal-overlay">
          <div className="modal-content small">
            <div className="modal-header">
              <h3>Editar Salário Base</h3>
              <X onClick={() => setShowModalSalario(false)} cursor="pointer" />
            </div>
            <form onSubmit={atualizarSalario}>
              <input
                type="number"
                step="0.01"
                value={tempSalario}
                onChange={(e) => setTempSalario(e.target.value)}
                autoFocus
                placeholder="0,00"
              />
              <button type="submit" className="btn-save">
                Salvar Salário
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL GASTO (ADICIONAR/EDITAR) */}
      {showModalGasto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editandoGastoId ? "Editar Gasto" : "Novo Gasto"}</h3>
              <X onClick={() => setShowModalGasto(false)} cursor="pointer" />
            </div>
            <form onSubmit={salvarGasto}>
              <label>Nome do Gasto</label>
              <input
                type="text"
                value={formData.nome}
                required
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Ex: Aluguel"
              />
              <label>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valor}
                required
                onChange={(e) =>
                  setFormData({ ...formData, valor: e.target.value })
                }
                placeholder="0,00"
              />
              <label>Vencimento (Dia)</label>
              <input
                type="text"
                value={formData.dia}
                onChange={(e) =>
                  setFormData({ ...formData, dia: e.target.value })
                }
                placeholder="Ex: 10"
              />
              <button type="submit" className="btn-save">
                Confirmar Gasto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalPage;
