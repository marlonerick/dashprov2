import { useEffect, useState } from "react";
import { ModalEditarVenda } from "../modalVendas/modalEditar/modalEditarVendas";
import { ModalRemoverVendas } from "../modalVendas/modalRemover/modalRemoverVendas";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { ModalAdicionarVendas } from "../modalVendas/modalAdicionar/modalAdicionarVendas";

export default function TabelaVendas() {
  const [vendas, setVendas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const [novaVenda, setNovaVenda] = useState(null);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [vendasSelecionadaDeletar, setVendasSelecionadaDeletar] =
    useState(null);

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/vendas");
      const data = await response.json();
      setVendas(data);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    }
  };

  const totalPaginas = Math.ceil(vendas.length / itensPorPagina);
  const vendasPaginadas = vendas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  return (
    <>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition m-1"
          onClick={() => setNovaVenda(true)}
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
              <th className="px-6 py-3">Produto</th>
              <th className="px-6 py-3">Quantidade</th>
              <th className="px-6 py-3">Familia</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-2 py-3">Responsável</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {vendasPaginadas.map((venda) => (
              <tr
                key={venda.id}
                className="bg-white border-b dark:bg-gray-200 dark:border-gray-200 border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-700 text-black dark:hover:text-white"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {venda.id}
                </th>
                <td className="px-14 py-4">{venda.produto}</td>
                <td className="px-14 py-4">{venda.quantidade}</td>
                <td className="px-6 py-4">{venda.familia}</td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(venda.valor)}
                </td>
                <td className="px-6 py-4">{venda.membro}</td>
                <td className="px-6 py-4">{venda.data_vendas}</td>
                <td className="flex items-center px-3 py-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition m-1"
                    onClick={() => setVendaSelecionada(venda)}
                  >
                    <Pencil size={16} />
                    <p>Editar</p>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition"
                    onClick={() => setVendasSelecionadaDeletar(venda)}
                  >
                    <Trash size={16} />
                    <p>Remover</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
        <div className="flex justify-between items-center mt-1 p-2 bg-gray-200">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
            onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span className="flex items-center">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
            onClick={() =>
              setPagina((prev) => Math.min(prev + 1, totalPaginas))
            }
            disabled={pagina === totalPaginas}
          >
            Próxima
          </button>
        </div>

        {/* MODAIS */}
        {novaVenda && (
          <ModalAdicionarVendas
            onClose={() => setNovaVenda(null)}
            onSave={carregarVendas}
          />
        )}
        {vendaSelecionada && (
          <ModalEditarVenda
            venda={vendaSelecionada}
            onClose={() => setVendaSelecionada(null)}
            onSave={carregarVendas}
          />
        )}
        {vendasSelecionadaDeletar && (
          <ModalRemoverVendas
            venda={vendasSelecionadaDeletar}
            onClose={() => setVendasSelecionadaDeletar(null)}
            onDelete={carregarVendas}
          />
        )}
      </div>
    </>
  );
}
