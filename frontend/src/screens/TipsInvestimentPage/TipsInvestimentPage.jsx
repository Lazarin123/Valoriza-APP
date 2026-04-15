//imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";
import "./TipsInvestimentPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

//mock infos cards
const tipsData = [
  //Dica 1
  {
    id: "1",
    title: "Como funciona?",
    content: `Funciona como um sistema de troca. Quem tem dinheiro não quer deixar parado. Quer ganhar rendimento. Para isso, "empresta" ou investe em algo que gere retorno. Quem precisa de dinheiro quer crescer. Pode ser uma empresa expandindo, alguém comprando uma casa ou até o governo investindo em obras.`,
    checks: ["Você investe em renda fixa", "Você compra ações"],
    summary:
      "Quem precisa de dinheiro quer crescer. Pode ser uma empresa expandindo, alguém comprando uma casa ou até o governo investindo em obras.",
  },
  //Dica 2
  {
    id: "2",
    title: "Quem organiza tudo?",
    content:
      "São a base do sistema. Recebem dinheiro de clientes e usam esse capital para emprestar a outras pessoas e empresas. Ganham na diferença de juros. Também oferecem financiamentos, crédito e produtos básicos para guardar e movimentar dinheiro.",
    checks: ["Bolsa de valores", "Corretoras", "Fundos de investimento"],
    summary:
      "Bancos fazem o dinheiro circular, Bolsa permite investir em empresas, Corretoras dão acesso ao mercado, Fundos facilitam e diversificam",
  },
  //Dica 3
  {
    id: "3",
    title: "Tipos de investimentos",
    content:
      "Você aplica em um CDB ou Tesouro. A instituição usa seu dinheiro. Depois devolve com rendimento. O ganho é mais previsível. Em muitos casos, você já sabe quanto vai receber ou tem uma estimativa próxima.",
    benefits: ["Mais segurança", "Menor risco", "Ideal para iniciantes"],
    extra: ["Maior potencial de lucro", "Renda variável"],
    summary:
      "Renda fixa → você empresta e ganha juros. Renda variável → você investe e assume o risco.",
  },
  //Dica 4
  {
    id: "4",
    title: "investir em Bancos (Ações)",
    content:
      "Os grandes bancos brasileiros são conhecidos por serem sólidos e bons pagadores de dividendos. Ao comprar ações (PETR4, ITUB4, BBAS3), você se torna sócio e recebe parte dos lucros. É uma estratégia de Renda Variável focada no longo prazo e na construção de renda passiva.",
    benefits: ["Dividendos Frequentes", "Setor resiliente na crise"],
    extra: ["Maior potencial de lucro"],
    summary:
      "Ser sócio de banco = receber parte dos lucros (dividendos). Ideal para quem busca renda mensal.",
  },
  //Dica 5
  {
    id: "5",
    title: "CDBs e Renda Fixa",
    content:
      "O CDB (Certificado de Depósito Bancário) é quando você empresta dinheiro para o banco financiar suas atividades. Em troca, ele te paga juros. Existem CDBs de liquidez diária (pode sacar a qualquer hora) e os de prazo fechado, que costumam pagar taxas maiores (IPCA+ ou Prefixado).",
    checks: ["Proteção do FGC", "Rendimento acima da poupança"],
    summary:
      "Emprestar para o banco é seguro e rende mais que a poupança. Verifique sempre o % do CDI.",
  },
  //Dica 6
  {
    id: "6",
    title: "LCI e LCA (Sem Imposto)",
    content:
      "As Letras de Crédito Imobiliário (LCI) e do Agronegócio (LCA) são títulos emitidos por bancos para captar recursos para esses setores. A grande vantagem é que são isentas de Imposto de Renda para pessoa física, o que pode fazer o rendimento líquido ser superior ao de um CDB.",
    benefits: ["Isenção de Imposto de Renda", "Baixo risco"],
    extra: ["Setores fortes da economia"],
    summary:
      "LCI e LCA = 0% de Imposto de Renda. Ótimo para rentabilidade real superior no curto/médio prazo.",
  },
  //Dica 7
  {
    id: "7",
    title: "Perfil Conservador",
    content:
      "Se você não suporta ver seu saldo diminuir nem por um dia e prioriza segurança total, este é o seu perfil. O foco aqui é preservar o patrimônio. É ideal para quem está montando a Reserva de Emergência ou planeja usar o dinheiro em curtíssimo prazo (menos de 1 ano).",
    checks: ["Foco em Renda Fixa", "Alta liquidez (saque rápido)"],
    summary:
      "Segurança > Rentabilidade. Indicado para quem está começando ou tem metas de curto prazo.",
  },
  //Dica 8
  {
    id: "8",
    title: "Perfil Moderado",
    content:
      "Você já entende que para ganhar um pouco mais é preciso aceitar pequenas oscilações. O investidor moderado busca o equilíbrio: mantém a base em segurança, mas destina uma parte (10% a 30%) para fundos multimercados ou ações de boas empresas pagadoras de dividendos.",
    checks: ["Equilíbrio de risco", "Diversificação inteligente"],
    summary:
      "O meio termo ideal. Aceita oscilações leves em troca de um retorno acima da inflação no médio prazo.",
  },
  //Dica 9
  {
    id: "9",
    title: "Perfil Arrojado / Experiente",
    content:
      "Indicado para quem tem estômago para a volatilidade do mercado e foco total no longo prazo (5 a 10 anos+). O objetivo é a multiplicação agressiva de capital. Se você já tem sua reserva garantida e busca lucros exponenciais com tecnologia e commodities, este é o caminho.",
    benefits: ["Alto potencial de ganho", "Acesso a mercados globais"],
    extra: ["Exige maior conhecimento"],
    summary:
      "Rentabilidade > Segurança. Para quem busca independência financeira e aceita riscos altos por retornos maiores.",
  },
];

const TipsInvestmentPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <Header />
      <main className={`tips-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Botão de Toggle Flutuante */}
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun color="white" /> : <Moon color="white" />}
        </button>

        <div className="tips-page__container">
          <header className="tips-page__header">
            {/* Botão Voltar */}
            <Link to="/investimento" className="tips-page__back-btn">
              <ArrowLeft size={20} /> Voltar
            </Link>

            <h1 className="tips-page__title">
              Tudo que você precisa saber, Para Começar a Investir!
            </h1>

            <p className="tips-page__subtitle">
              Atenção: É fundamental ler atentamente todas as dicas abaixo antes
              de tomar qualquer decisão ou iniciar seus investimentos.
            </p>
          </header>

          <section className="tips-page__grid">
            {tipsData.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-card__header">
                  <h2 className="tip-card__title">{tip.title}</h2>
                  <Lightbulb className="tip-card__icon" />
                </div>

                <div className="tip-card__body">
                  <p className="tip-card__text">{tip.content}</p>

                  <ul className="tip-card__list">
                    {tip.checks?.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} /> {item}
                      </li>
                    ))}
                    {tip.benefits?.map((item, i) => (
                      <li key={i} className="dot">
                        {item}
                      </li>
                    ))}
                    {tip.extra?.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tip-card__resume">
                  <h3>Resumo:</h3>
                  {Array.isArray(tip.summary) ? (
                    <ul>
                      {tip.summary.map((line, i) => (
                        <li key={i}>• {line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{tip.summary}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="tips-page__faq">
            <h2 className="faq-title">Dúvidas Frequentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Quanto preciso para começar?</h4>
                <p>Existem títulos no Tesouro Direto a partir de R$ 30,00.</p>
              </div>
              <div className="faq-item">
                <h4>Posso perder tudo?</h4>
                <p>
                  Em renda fixa é muito difícil. Em ações, o risco existe, por
                  isso diversificamos.
                </p>
              </div>
              <div className="faq-item">
                <h4>
                  Como faço para adicionar meus investimentos atuais na
                  plataforma?
                </h4>
                <p>
                  Na aba de Investimentos, clique em "Adicionar Ativo". Você
                  pode inserir os dados manualmente ou integrar com a sua
                  corretora para importação automática. A partir daí, o painel
                  passa a rastrear a evolução do seu patrimônio.
                </p>
              </div>
              <div className="faq-item">
                <h4>
                  Posso cadastrar e acompanhar qualquer tipo de investimento,
                  como ações, tesouro direto e criptomoedas?
                </h4>
                <p>
                  Sim! O painel foi estruturado para centralizar toda a sua
                  carteira. Você consegue registrar desde ativos de Renda Fixa e
                  Renda Variável (como ações e FIIs) até Criptomoedas e fundos.
                  A ideia é que você tenha a visão completa e unificada de todo
                  o seu patrimônio em uma única tela.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TipsInvestmentPage;
