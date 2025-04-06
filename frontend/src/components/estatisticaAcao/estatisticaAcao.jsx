import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function GraficosAcoes() {
  const [acoes, setAcoes] = useState([]);
  const [filtroQuantidade, setFiltroQuantidade] = useState("dia");
  const [filtroValor, setFiltroValor] = useState("dia");

  useEffect(() => {
    carregarAcoes();
  }, []);

  const carregarAcoes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/acoes");
      const data = await response.json();
      setAcoes(data);
    } catch (error) {
      console.error("Erro ao carregar ações:", error);
    }
  };

  // Agrupadores
  const agruparPor = (array, callback) => {
    return array.reduce((acc, item) => {
      const chave = callback(item);
      acc[chave] = acc[chave] || [];
      acc[chave].push(item);
      return acc;
    }, {});
  };

  // Dados do Gráfico 1: Quantidade de ações por nome
  const getGraficoQuantidade = () => {
    const agrupado = agruparPor(acoes, (a) => {
      const data = new Date(a.data_acao.split("/").reverse().join("-"));
      if (filtroQuantidade === "semana") {
        const semana = Math.ceil(data.getDate() / 7);
        return `${semana}ª Semana - ${data.getMonth() + 1}/${data.getFullYear()}`;
      } else if (filtroQuantidade === "mes") {
        return `${data.getMonth() + 1}/${data.getFullYear()}`;
      } else {
        return a.data_acao;
      }
    });

    return Object.entries(agrupado).map(([periodo, lista]) => ({
      periodo,
      ...lista.reduce((acc, a) => {
        acc[a.acao] = (acc[a.acao] || 0) + 1;
        return acc;
      }, {}),
    }));
  };

  // Dados do Gráfico 2: Valor total
  const getGraficoValor = () => {
    const agrupado = agruparPor(acoes, (a) => {
      const data = new Date(a.data_acao.split("/").reverse().join("-"));
      if (filtroValor === "semana") {
        const semana = Math.ceil(data.getDate() / 7);
        return `${semana}ª Semana - ${data.getMonth() + 1}/${data.getFullYear()}`;
      } else if (filtroValor === "mes") {
        return `${data.getMonth() + 1}/${data.getFullYear()}`;
      } else {
        return a.data_acao;
      }
    });

    return Object.entries(agrupado).map(([periodo, lista]) => ({
      periodo,
      valor: lista.reduce((acc, a) => acc + Number(a.valor), 0),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Gráfico de Quantidade */}
      <div>
        <h2 className="flex items-center gap-2 font-semibold text-lg">
          📊 Gráfico de Quantidade de Ações
        </h2>
        <div className="flex space-x-2 mt-2">
          {["dia", "semana", "mes"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${filtroQuantidade === f ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFiltroQuantidade(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getGraficoQuantidade()}>
            <XAxis dataKey="periodo" />
            <YAxis />
            <Tooltip />
            <Legend />
            {acoes
              .map((a) => a.acao)
              .filter((v, i, self) => self.indexOf(v) === i)
              .map((acao) => (
                <Bar key={acao} dataKey={acao} stackId="a" fill="#00F" />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Valor Total */}
      <div>
        <h2 className="flex items-center gap-2 font-semibold text-lg">
          💰 Gráfico de Valor Total das Ações
        </h2>
        <div className="flex space-x-2 mt-2">
          {["dia", "semana", "mes"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${filtroValor === f ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFiltroValor(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getGraficoValor()}>
            <XAxis dataKey="periodo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#00F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
