import { useEffect, useState } from "react";
import { ModalDeletarRegistro } from "../modalRegistro/modalDeletarRegistros/modalDeletarRegistro";
import { ModalEditarRegistro } from "../modalRegistro/modalEditarRegistros/ModalEditarRegistro";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { ModalAdicionarRegistros } from "../modalRegistro/modalAdicionarRegistros/modalAdicionarRegistros";

export default function TabelaMembros() {
  const [registros, setRegistros] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 10;

  const [novosregistros, setNovosRegistros] = useState(null);
  const [registrosSelecionada, setRegistrosSelecionada] = useState(null);
  const [registrosSelecionadaDeletar, setRegistrosSelecionadaDeletar] = useState(null);

  useEffect(() => {
    carregarRegistros();
  }, []);

  const carregarRegistros = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/registros");
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    }
  };

  // -----------------------
  // PAGINAÇÃO
  // -----------------------

  const indexUltimoRegistro = paginaAtual * registrosPorPagina;
  const indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
  const registrosVisiveis = registros.slice(indexPrimeiroRegistro, indexUltimoRegistro);

  const totalPaginas = Math.ceil(registros.length / registrosPorPagina);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition m-1"
          onClick={() => setNovosRegistros(true)}
        >
          <CirclePlus color="#FFF" />
          <p className="mx-1">CADASTRAR</p>
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        {/* TABELA */}
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-white">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="px-14 py-3">ID</th>
              <th className="px-6 py-3">Nome Completo</th>
              <th className="px-6 py-3">Vulgo(Apelido)</th>
              <th className="px-6 py-3">ID(CPF)</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {registrosVisiveis.map((registro) => (
              <tr key={registro.id} className="bg-white border-b dark:bg-gray-200 dark:border-gray-200 border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-700 text-black dark:hover:text-white">
                <th className="px-14 py-4 font-medium whitespace-nowrap">{registro.id}</th>
                <td className="px-6 py-4">{registro.nome}</td>
                <td className="px-6 py-4">{registro.vulgo}</td>
                <td className="px-6 py-4">{registro.id_cpf}</td>
                <td className="px-6 py-4">{registro.telefone}</td>
                <td className="px-6 py-4">{registro.data_registro}</td>
                <td className="flex items-center px-3 py-2">
                  <button onClick={() => setRegistrosSelecionada(registro)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition m-1">
                    <Pencil size={16} />
                    <p>Editar</p>
                  </button>
                  <button onClick={() => setRegistrosSelecionadaDeletar(registro)} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition">
                    <Trash size={16} />
                    <p>Remover</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CONTROLES DA PAGINAÇÃO */}
        <div className="flex justify-between items-center mt-1 p-2 bg-gray-200">
          <button
            onClick={paginaAnterior}
            disabled={paginaAtual === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button
            onClick={proximaPagina}
            disabled={paginaAtual === totalPaginas}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>

        {/* MODAIS */}
        {novosregistros && (
          <ModalAdicionarRegistros onClose={() => setNovosRegistros(null)} onSave={carregarRegistros} />
        )}
        {registrosSelecionada && (
          <ModalEditarRegistro registro={registrosSelecionada} onClose={() => setRegistrosSelecionada(null)} onSave={carregarRegistros} />
        )}
        {registrosSelecionadaDeletar && (
          <ModalDeletarRegistro registro={registrosSelecionadaDeletar} onClose={() => setRegistrosSelecionadaDeletar(null)} onDelete={carregarRegistros} />
        )}
      </div>
    </>
  );
}
