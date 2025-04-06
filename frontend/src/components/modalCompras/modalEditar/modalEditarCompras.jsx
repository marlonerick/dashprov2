import { useState, useEffect } from "react";

export function ModalEditarCompras({ compra, onClose, onSave }) {
  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    valor: "",
    responsavel: "",
    data_compras: "",
  });

  useEffect(() => {
    if (compra) {
      setFormData(compra); // Preenche os dados da compra selecionada
    }
  }, [compra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/compras/${compra.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave(); // Atualiza a tabela após edição
        onClose(); // Fecha o modal
      } else {
        console.error("Erro ao editar compra");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Alterar Compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Produto:</label>
            <input
              type="text"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Valor (R$):</label>
            <input
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Membro:</label>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Data:</label>
            <input
              type="date"
              name="data_compras"
              value={formData.data_compras.split("/").reverse().join("-")} // Converte DD/MM/YYYY para YYYY-MM-DD
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
