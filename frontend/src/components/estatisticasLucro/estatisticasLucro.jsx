import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#00F", "#808080"]; // Vendas (azul) e Compras (cinza)

export function LucroAnalise() {
  const [dados, setDados] = useState([]);
  const [lucroDisponivel, setLucroDisponivel] = useState(0); // Novo estado para o lucro disponível

  useEffect(() => {
    async function fetchData() {
      try {
        const resVendas = await fetch("http://localhost:8000/api/vendas");
        const resCompras = await fetch("http://localhost:8000/api/compras");
        const vendas = await resVendas.json();
        const compras = await resCompras.json();

        // Data de hoje e limite de 30 dias atrás
        const hoje = new Date();
        const limiteDias = new Date();
        limiteDias.setDate(hoje.getDate() - 30);

        // Função para filtrar os últimos 30 dias
        const filtrarUltimos30Dias = (lista) =>
          lista.filter((item) => {
            if (!item.data_vendas && !item.data_compras) return false; // Ignorar sem data
            const data = new Date((item.data_vendas || item.data_compras).split("/").reverse().join("-"));
            return data >= limiteDias && data <= hoje;
          });

        // Filtrar os dados antes de calcular os totais
        const vendasFiltradas = filtrarUltimos30Dias(vendas);
        const comprasFiltradas = filtrarUltimos30Dias(compras);

        // Somar valores totais das vendas e compras filtradas
        const totalVendas = vendasFiltradas.reduce((acc, v) => acc + parseFloat(v.valor), 0);
        const totalCompras = comprasFiltradas.reduce((acc, c) => acc + parseFloat(c.valor), 0);

        // Calcular o lucro disponível
        const lucro = totalVendas - totalCompras;

        // Atualizar o estado com os dados filtrados e lucro
        setDados([
          { name: "Vendas", value: totalVendas },
          { name: "Compras", value: totalCompras },
        ]);
        setLucroDisponivel(lucro); // Atualizar o lucro disponível
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold">📊 Análise de Lucros (Últimos 30 Dias)</h2>

      {/* Exibição do lucro disponível */}
      <div className="mt-4 text-2xl font-semibold">
        <p>🧮 Lucro Disponível:</p>
        <p className="text-xl text-green-600">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(lucroDisponivel)}
        </p>
      </div>

      {/* Gráfico de Pizza */}
      {dados.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dados} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {dados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)} />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">🔄 Carregando dados...</p>
      )}
    </div>
  );
}
