import { useEffect, useState } from "react";
import { ModalRemoverEncomendas } from "../modalEncomendas/modalRemoverEncomendas/modalRemoverEncomendas";
import { ModalEditarEncomendas } from "../modalEncomendas/modalEditarEncomendas/modalEditarencomendas";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { ModalAdicionarEncomenda } from "../modalEncomendas/modalAdicionar/modalAdicionarEncomenda";

export default function TabelaEncomendas() {
  {
    /*Paginação */
  }
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const [encomendas, setEncomendas] = useState([]);
  const [novaencomenda, setNovaEncomenda] = useState(null);
  const [encomendasSelecionada, setEncomendasSelecionada] = useState(null);
  const [encomendasSelecionadaDeletar, setEncomendasSelecionadaDeletar] =
    useState(null);

  useEffect(() => {
    carregarEncomendas();
  }, []);

  const carregarEncomendas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/encomendas");
      const data = await response.json();
      setEncomendas(data);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    }
  };

  const totalPaginas = Math.ceil(encomendas.length / itensPorPagina);
  const encomendasPaginadas = encomendas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  return (
    <>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition m-1"
          onClick={() => setNovaEncomenda(true)}
        >
          <CirclePlus color="#FFF" />
          <p className="mx-1">CADASTRAR</p>
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-white dark:text-white">
          <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Nome
              </th>
              <th scope="col" class="px-6 py-3">
                Telefone
              </th>
              <th scope="col" class="px-6 py-3">
                Familia
              </th>
              <th scope="col" class="px-6 py-3">
                Produto
              </th>
              <th scope="col" class="px-6 py-3">
                Quantidade
              </th>
              <th scope="col" class="px-6 py-3">
                Data
              </th>
              <th scope="col" class="px-6 py-3">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {encomendasPaginadas.map((encomenda) => (
              <tr
                key={encomenda.id}
                class="bg-white border-b dark:bg-gray-200 dark:border-gray-200 border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-700 text-black dark:hover:text-white"
              >
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                  {encomenda.id}
                </th>
                <td class="px-14 py-4">{encomenda.nome}</td>
                <td class="px-14 py-4">{encomenda.telefone}</td>
                <td class="px-6 py-4">{encomenda.familia}</td>
                <td class="px-6 py-4">{encomenda.produto}</td>
                <td class="px-6 py-4">{encomenda.quantidade}</td>
                <td class="px-6 py-4">{encomenda.data}</td>

                <td className="flex items-center px-3 py-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition m-1"
                    onClick={() => setEncomendasSelecionada(encomenda)}
                  >
                    <Pencil size={16} />
                    <p>Editar</p>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition"
                    href="#"
                    onClick={() => setEncomendasSelecionadaDeletar(encomenda)}
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

        {novaencomenda && (
          <ModalAdicionarEncomenda
            onClose={() => setNovaEncomenda(null)}
            onSave={carregarEncomendas}
          />
        )}
        {encomendasSelecionada && (
          <ModalEditarEncomendas
            encomenda={encomendasSelecionada}
            onClose={() => setEncomendasSelecionada(null)}
            onSave={carregarEncomendas}
          />
        )}

        {encomendasSelecionadaDeletar && (
          <ModalRemoverEncomendas
            encomenda={encomendasSelecionadaDeletar}
            onClose={() => setEncomendasSelecionadaDeletar(null)}
            onDelete={carregarEncomendas}
          />
        )}
      </div>
    </>
  );
}
