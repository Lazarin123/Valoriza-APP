import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ExpenseChart = ({ data }) => {
  // Cores seguindo a paleta: Vermelho, Amarelo, Verde
  const COLORS = ["#EE5D50", "#FFCE20", "#01B574"];

  return (
    <div style={{ width: "100%", height: 80 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={25} // Deixa o gráfico em formato de "Donut"
            outerRadius={40}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
