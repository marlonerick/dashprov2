import { useState, useEffect } from "react";
import { ModalRemoverMetas } from "../modalMetas/ModalRemover/modalRemoverMetas";
import { ModalEditarMetas } from "../modalMetas/modalEditar/modalEditarMetas";
import moment from "moment";

export default function MetasDashboard() {
  const [metas, setMetas] = useState([]);
  const [metaSelecionada, setMetaSelecionada] = useState(null);
  const [metaParaRemover, setMetaParaRemover] = useState(null);

  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const [formData, setFormData] = useState({
    nome: "",
    forma_pagamento: "Dinheiro",
    valor_pago: "",
    item_entregue: "",
    data_pagamento: "",
  });

  useEffect(() => {
    carregarMetas();
  }, []);

  const carregarMetas = async () => {
    try {
      const response = await fetch("https://backenddashboard.fly.dev/api/metas");
      const data = await response.json();
      setMetas(data);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adicionarOuEditarMeta = async (e) => {
    e.preventDefault();

    const dataMetas = moment(formData.data_pagamento).format("DD/MM/YYYY");
    const formDataAtualizado = { ...formData, data_pagamento: dataMetas };

    try {
      const response = await fetch("http://localhost:8000/api/metas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataAtualizado),
      });

      if (response.ok) {
        carregarMetas();
        // const data = await response.json();
        // console.log("Meta cadastrada com sucesso:", data);
      } else {
        console.error("Erro ao salvar meta");
      }

      setFormData({
        nome: "",
        forma_pagamento: "Dinheiro",
        valor_pago: "",
        item_entregue: "",
        data_pagamento: "",
      });
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    }
  };

  const totalPaginas = Math.ceil(metas.length / itensPorPagina);
  const metasPaginadas = metas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  return (
    <>
      <h2 className="text-xl font-bold my-4">Controle de Metas</h2>
      <form onSubmit={adicionarOuEditarMeta} className="mb-4">
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="border p-2 mr-2"
          required
        />
        <select
          name="forma_pagamento"
          value={formData.forma_pagamento}
          onChange={handleChange}
          className="border p-2 mr-2"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Item">Item</option>
          <option value="Material">Material</option>
        </select>
        {formData.forma_pagamento === "Dinheiro" && (
          <input
            type="number"
            name="valor_pago"
            value={formData.valor_pago}
            onChange={handleChange}
            placeholder="Valor"
            className="border p-2 mr-2"
          />
        )}
        {formData.forma_pagamento === "Item" && (
          <input
            type="text"
            name="item_entregue"
            value={formData.item_entregue}
            onChange={handleChange}
            placeholder="Item"
            className="border p-2 mr-2"
          />
        )}
        {formData.forma_pagamento === "Material" && (
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="Material"
            className="border p-2 mr-2"
          />
        )}
        <input
          type="date"
          name="data_pagamento"
          value={formData.data_pagamento}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          <p>Salvar</p>
        </button>
      </form>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-white dark:text-white">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Usuário</th>
                <th className="px-6 py-3">Forma de Pagamento</th>
                <th className="px-6 py-3">Quantidade</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {metasPaginadas.map((meta) => (
                <tr
                  key={meta.id}
                  className="bg-gray-200 border-b hover:bg-gray-900 text-black dark:hover:text-white"
                >
                  <td className="px-6 py-4">{meta.id}</td>
                  <td className="px-6 py-4">{meta.nome}</td>
                  <td className="px-6 py-4">{meta.forma_pagamento}</td>
                  <td className="px-6 py-4">
                    {meta.forma_pagamento === "Dinheiro"
                      ? meta.valor_pago
                      : meta.forma_pagamento === "Item"
                      ? meta.item_entregue
                      : meta.forma_pagamento === "Material"
                      ? meta.material
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{meta.data_pagamento}</td>
                  <td className="px-6 py-4">{meta.status}</td>
                  <td className="flex items-center px-6 py-4">
                    <button
                      onClick={() => setMetaSelecionada(meta)}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setMetaParaRemover(meta)}
                      className="text-red-500 hover:underline ml-3"
                    >
                      Remover
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
        </div>

        {metaSelecionada && (
          <ModalEditarMetas
            metaSelecionada={metaSelecionada}
            onClose={() => setMetaSelecionada(null)}
            onSave={carregarMetas}
          />
        )}
        {metaParaRemover && (
          <ModalRemoverMetas
            metaSelecionada={metaParaRemover}
            onClose={() => setMetaParaRemover(null)}
            onDelete={carregarMetas}
          />
        )}
      </div>
    </>
  );
}
