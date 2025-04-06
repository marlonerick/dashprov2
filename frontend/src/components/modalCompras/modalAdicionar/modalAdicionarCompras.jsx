import { useState } from "react";
import moment from "moment";

export function ModalAdicionarCompras({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    valor: "",
    responsavel: "",
    data_compras: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Antes da formatação:", formData);

    // Verifica se o campo data_compras está preenchido antes de formatar
    if (!formData.data_compras) {
      alert("A data é obrigatória!");
      return;
    }

    const dataCompras = moment(formData.data_compras).format("DD/MM/YYYY");
    const formDataAtualizado = { ...formData, data_compras: dataCompras };

    console.log("Dados enviados para o backend:", formDataAtualizado);

    try {
      const response = await fetch("http://localhost:8000/api/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataAtualizado),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro no backend:", errorData);
        throw new Error(errorData.error || "Erro desconhecido ao cadastrar compra");
      }

      const data = await response.json();
      console.log("Compra cadastrada com sucesso:", data);

      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar compra:", error.message);
      alert(`Erro: ${error.message}`);
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
              value={formData.data_compras}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {formData.data_compras === "" && (
              <span className="text-red-500 text-xs">Campo obrigatório</span>
            )}
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
