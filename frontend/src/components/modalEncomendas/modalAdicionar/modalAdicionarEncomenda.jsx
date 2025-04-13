import { useState } from "react";
import moment from "moment";

export function ModalAdicionarEncomenda({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    familia: "",
    produto: "",
    quantidade: "",
    data: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataEncomenda = moment(formData.data).format("DD/MM/YYYY");
    const formDataAtualizado = { ...formData, data: dataEncomenda };

    try {
      const response = await fetch("http://localhost:8000/api/encomendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataAtualizado),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erro desconhecido ao cadastrar acao"
        );
      }

      // const data = await response.json();
      // console.log("Venda cadastrada com sucesso:", data);

      onSave(); // Atualiza a tabela após cadastro
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao cadastrar acao:", error.message);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Adicionar Venda</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Familia</label>
            <input
              type="text"
              name="familia"
              value={formData.familia}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Produto</label>
            <input
              type="text"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Quantidade</label>
            <input
              type="text"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Data:</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {formData.data === "" && (
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
