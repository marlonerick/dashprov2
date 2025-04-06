import { useState, useEffect } from "react";

export function ModalEditarAcao({ acao, onClose, onSave }) {
  const [formData, setFormData] = useState({
    acao: "",
    organizador: "",
    valor: "",
    membros: "",
    ganhou: "",
    data_acao: "",
  });

  useEffect(() => {
    if (acao) {
      setFormData(acao); // Preenche os dados da acao selecionada
    }
  }, [acao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/acoes/${acao.id}`,
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
        console.error("Erro ao editar compra");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Alterar Ação</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Ação</label>
            <select
              name="acao"
              value={formData.acao}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione</option>
              <option value="Barbearia">Barbearia</option>
              <option value="Ammunation">Ammunation</option>
              <option value="Lojinha">Lojinha</option>
              <option value="Açougue">Açougue</option>
              <option value="Galinheiro">Galinheiro</option>
              <option value="Fleeca">Fleeca</option>
              <option value="Joalheria">Joalheria</option>
              <option value="Banco central">Banco central</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Responsável</label>
            <input
              type="text"
              name="organizador"
              value={formData.organizador}
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
            <label className="block text-sm font-medium">Membros</label>
            <input
              type="text"
              name="membros"
              value={formData.membros}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">V/D</label>
            <input
              type="text"
              name="ganhou"
              value={formData.ganhou}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Data:</label>
            <input
              type="date"
              name="data_acao"
              value={formData.data_acao.split("/").reverse().join("-")} // Converte DD/MM/YYYY para YYYY-MM-DD
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
