import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Função para formatar os valores em reais (R$)
const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  );

// Função para agrupar os dados por período (dia, semana, mês)
function agruparVendas(vendas) {
  const vendasPorDia = {};
  const vendasPorSemana = {};
  const vendasPorMes = {};

  vendas.forEach((venda) => {
    if (!venda.data_vendas) return; // Ignorar vendas sem data

    // Converter a data da venda para um objeto Date
    const data = new Date(venda.data_vendas.split("/").reverse().join("/"));

    // Formatar para Dia, Semana e Mês corretamente
    const dia = data.toISOString().split("T")[0].split("/").reverse().join("/");
    const semana = `Semana ${Math.ceil(data.getDate() / 7)}`;
    const mes = data.toLocaleString("pt-BR", { month: "long" });

    const valorVenda = parseFloat(venda.valor) || 0;

    // Agrupar por Dia
    if (!vendasPorDia[dia]) vendasPorDia[dia] = 0;
    vendasPorDia[dia] += valorVenda;

    // Agrupar por Semana
    if (!vendasPorSemana[semana]) vendasPorSemana[semana] = 0;
    vendasPorSemana[semana] += valorVenda;

    // Agrupar por Mês
    if (!vendasPorMes[mes]) vendasPorMes[mes] = 0;
    vendasPorMes[mes] += valorVenda;
  });

  // **Ordenando as datas corretamente**
  const ordenarDatas = (arr) =>
    arr.sort((a, b) => new Date(a.periodo) - new Date(b.periodo));

  return {
    dia: ordenarDatas(
      Object.keys(vendasPorDia).map((dia) => ({
        periodo: dia,
        total: vendasPorDia[dia],
      }))
    ),
    semana: ordenarDatas(
      Object.keys(vendasPorSemana).map((semana) => ({
        periodo: semana,
        total: vendasPorSemana[semana],
      }))
    ),
    mes: ordenarDatas(
      Object.keys(vendasPorMes).map((mes) => ({
        periodo: mes,
        total: vendasPorMes[mes],
      }))
    ),
  };
}
export function EstatisticaVendas() {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState("dia"); // Estado para alternar entre dia, semana e mês
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/vendas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar dados");
        }
        return response.json();
      })
      .then((json) => {
        const dadosAgrupados = agruparVendas(Array.isArray(json) ? json : [json]);
        setData(dadosAgrupados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("🚨 Erro ao buscar dados:", error);
        setError("Não foi possível carregar os dados.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-lg font-semibold">📊 Gráfico de Vendas</h2>

      {/* Botões para alternar entre períodos */}
      <div className="flex gap-2 my-4">
        {["dia", "semana", "mes"].map((p) => (
          <button
            key={p}
            className={`px-4 py-2 rounded ${periodo === p ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setPeriodo(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Exibição de mensagens ou gráficos */}
      {loading ? (
        <p className="text-gray-500">🔄 Carregando dados...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        data[periodo]?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data[periodo]}>
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="total" fill="#00F" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">📉 Nenhum dado disponível para o período selecionado.</p>
        )
      )}
    </div>
  );
}
