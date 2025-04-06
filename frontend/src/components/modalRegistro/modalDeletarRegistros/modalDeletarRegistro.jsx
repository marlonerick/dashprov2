import { useState } from "react";

export function ModalDeletarRegistro({ registro, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/registros/${registro.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(); // Atualiza a lista de registros após exclusão
        onClose(); // Fecha o modal
      } else {
        console.error("Erro ao deletar a registro");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Confirmar Exclusão
        </h2>
        <p className="mb-2">Tem certeza que deseja excluir este registro?</p>

        <div className="border p-3 rounded bg-gray-100">
          <p><strong>ID:</strong> {registro.id}</p>
          <p><strong>Nome:</strong> {registro.nome}</p>
          <p><strong>ID/CPF:</strong>{registro.id_cpf}</p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 bg-red-600 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Excluindo..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
