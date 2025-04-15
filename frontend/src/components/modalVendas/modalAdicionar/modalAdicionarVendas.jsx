import { useState } from "react";
import moment from 'moment';

export function ModalAdicionarVendas({ onClose, onSave }) {
  const getDataHoje = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    return `${ano}-${mes}-${dia}`;

  };

  const [formData, setFormData] = useState({
    produto: "",
    quantidade: "",
    familia: "",
    valor: "",
    membro: "",
    data_vendas: getDataHoje(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataVendas = moment(formData.data_vendas).format('DD/MM/YYYY');
    const formDataAtualizado = { ...formData, data_vendas : dataVendas };

    try {
      const response = await fetch("http://localhost:8000/api/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataAtualizado),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erro desconhecido ao cadastrar venda"
        );
      }
      onSave(); // Atualiza a tabela após cadastro
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error.message);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Adicionar Venda</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Produto:</label>
            <input
              type="text"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
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
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Família:</label>
            <input
              type="text"
              name="familia"
              value={formData.familia}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Valor (R$):</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Membro:</label>
            <input
              type="text"
              name="membro"
              value={formData.membro}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Data:</label>
            <input
              type="date"
              name="data_vendas"
              value={formData.data_vendas || getDataHoje()}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {formData.data_vendas === "" && (
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
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
