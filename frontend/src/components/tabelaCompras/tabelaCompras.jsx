import { useEffect, useState } from "react";
import { ModalEditarCompras } from "../modalCompras/modalEditar/modalEditarCompras";
import { ModalDeletarCompras } from "../modalCompras/modalRemover/modalRemoverCompras";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { ModalAdicionarCompras } from "../modalCompras/modalAdicionar/modalAdicionarCompras";

export default function TabelaCompras() {
  const [compras, setCompras] = useState([]);
  const [novaCompra, setNovaCompra] = useState(null);
  const [comprasSelecionada, setComprasSelecionada] = useState(null);
  const [comprasSelecionadaDeletar, setComprasSelecionadaDeletar] =
    useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/compras");
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error("Erro ao carregar compras:", error);
    }
  };

  const totalPaginas = Math.ceil(compras.length / itensPorPagina);
  const comprasPaginadas = compras.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

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
          onClick={() => setNovaCompra(true)}
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
              <th className="px-6 py-3">Valor</th>
              <th className="px-3 py-3">Responsável</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {comprasPaginadas.map((compra) => (
              <tr
                key={compra.id}
                className="bg-white border-b dark:bg-gray-200 dark:border-gray-200 border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-700 text-black dark:hover:text-white"
              >
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  {compra.id}
                </th>
                <td className="px-14 py-4">{compra.produto}</td>
                <td className="px-14 py-4">{compra.quantidade}</td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(compra.valor)}
                </td>
                <td className="px-6 py-4">{compra.responsavel}</td>
                <td className="px-6 py-4">{compra.data_compras}</td>
                <td className="flex items-center py-2">
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition m-1"
                    onClick={() => setComprasSelecionada(compra)}
                  >
                    <Pencil size={14} />
                    <p>Editar</p>
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition"
                    onClick={() => setComprasSelecionadaDeletar(compra)}
                  >
                    <Trash size={14} />
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
            onClick={() => mudarPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="flex items-center">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            onClick={() => mudarPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>

        {/* MODAIS */}
        {novaCompra && (
          <ModalAdicionarCompras
            onClose={() => setNovaCompra(null)}
            onSave={carregarCompras}
          />
        )}
        {comprasSelecionada && (
          <ModalEditarCompras
            compra={comprasSelecionada}
            onClose={() => setComprasSelecionada(null)}
            onSave={carregarCompras}
          />
        )}
        {comprasSelecionadaDeletar && (
          <ModalDeletarCompras
            compra={comprasSelecionadaDeletar}
            onClose={() => setComprasSelecionadaDeletar(null)}
            onDelete={carregarCompras}
          />
        )}
      </div>
    </>
  );
}
