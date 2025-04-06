import { useEffect, useState } from "react";
import { ModalRemoverAcao } from "../modalAcao/modalRemoverAcao/modalRemoverAcao";
import { ModalEditarAcao } from "../modalAcao/modalEditarAcao/modalEditarAcao";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { ModalAdicionarAcao } from "../modalAcao/modalAdicionar/modalAdicionarAcao";

export default function TabelaAcoes() {
  const [acoes, setAcoes] = useState([]);
  const [novaAcao, setNovaAcao] = useState(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);
  const [acaoSelecionadaDeletar, setAcaoSelecionadaDeletar] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;

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

  // Paginação
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const acoesPaginadas = acoes.slice(indexPrimeiroItem, indexUltimoItem);
  const totalPaginas = Math.ceil(acoes.length / itensPorPagina);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition m-1"
          onClick={() => setNovaAcao(true)}
        >
          <CirclePlus color="#FFF" />
          <p className="mx-1">CADASTRAR</p>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-white">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Ação</th>
              <th className="px-6 py-3">Organizador</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3">Membros</th>
              <th className="px-6 py-3">V/D?</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {acoesPaginadas.map((acao) => (
              <tr
                key={acao.id}
                className="bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-700 text-black dark:hover:text-white"
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap">{acao.id}</td>
                <td className="px-6 py-4">{acao.acao}</td>
                <td className="px-6 py-4">{acao.organizador}</td>
                <td className="px-6 py-4">R$ {acao.valor}</td>
                <td className="px-6 py-4">{acao.membros}</td>
                <td className="px-6 py-4">{acao.ganhou}</td>
                <td className="px-6 py-4">{acao.data_acao}</td>
                <td className="flex items-center py-2">
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition m-1"
                    onClick={() => setAcaoSelecionada(acao)}
                  >
                    <Pencil size={14} />
                    <p>Editar</p>
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition"
                    onClick={() => setAcaoSelecionadaDeletar(acao)}
                  >
                    <Trash size={14} />
                    <p>Remover</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-1 p-2 bg-gray-200">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => mudarPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span className="flex items-center">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => mudarPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>

        {/* Modais */}
        {novaAcao && (
          <ModalAdicionarAcao
            onClose={() => setNovaAcao(null)}
            onSave={carregarAcoes}
          />
        )}
        {acaoSelecionada && (
          <ModalEditarAcao
            acao={acaoSelecionada}
            onClose={() => setAcaoSelecionada(null)}
            onSave={carregarAcoes}
          />
        )}
        {acaoSelecionadaDeletar && (
          <ModalRemoverAcao
            acao={acaoSelecionadaDeletar}
            onClose={() => setAcaoSelecionadaDeletar(null)}
            onDelete={carregarAcoes}
          />
        )}
      </div>
    </>
  );
}
