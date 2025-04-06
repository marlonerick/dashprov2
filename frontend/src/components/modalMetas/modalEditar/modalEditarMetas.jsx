import { useState, useEffect } from "react";

export function ModalEditarMetas({ metaSelecionada, onClose, onSave }) {
  {
    console.log(metaSelecionada);
  }
  const [formData, setFormData] = useState({
    nome: "",
    forma_pagamento: "Dinheiro",
    valor_pago: "",
    item_entregue: "",
    material: "",
    data_pagamento: "",
  });

  useEffect(() => {
    if (metaSelecionada) {
      setFormData(metaSelecionada); // Preenche os dados da metas selecionada
    }
  }, [metaSelecionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/metas/${metaSelecionada.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        onSave(); // Atualiza a tabela após edição
        onClose(); // Fecha o modal
      } else {
        console.error("Erro ao editar metas");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const renderInputByPaymentMethod = () => {
    if (formData.forma_pagamento === "Material") {
      return (
        <div className="mb-2">
          <label className="block text-sm font-medium">Material</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      );
    } else if (formData.forma_pagamento === "Item") {
      return (
        <div className="mb-2">
          <label className="block text-sm font-medium">Item</label>
          <input
            type="text"
            name="item_entregue"
            value={formData.item_entregue}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      );
    } else if (formData.forma_pagamento === "Dinheiro") {
      return (
        <div className="mb-2">
          <label className="block text-sm font-medium">Dinheiro</label>
          <input
            type="text"
            name="valor_pago"
            value={formData.valor_pago}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      );
    }
    return null; // Se nenhum for selecionado, não renderiza nada
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Alterar Compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="usuario"
              value={formData.nome}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">
              Forma de Pagamento
            </label>
            <select
              name="forma_pagamento"
              value={formData.forma_pagamento}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Material">Material</option>
              <option value="Item">Item</option>
            </select>
          </div>

          {renderInputByPaymentMethod()}

          <div className="mb-2">
            <label className="block text-sm font-medium">Data</label>
            <input
              type="date"
              name="data"
              value={formData.data_pagamento} // Converte DD/MM/YYYY para YYYY-MM-DD
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
