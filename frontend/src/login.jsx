import { useState } from "react";
import { useNavigate } from "react-router-dom";

const salvarUsuario = (dados) => {
  const tempoExpiracao = Date.now() + 1 * 60 * 1000; // 30 minutos em milissegundos
  localStorage.setItem(
    "usuario",
    JSON.stringify({ ...dados, expira: tempoExpiracao })
  );
};

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (response.ok) {
        salvarUsuario(data);
        // localStorage.setItem("usuario", JSON.stringify(data));
        navigate("/home"); // Redireciona para o painel principal
      } else {
        setErro(data.error);
      }
    } catch (error) {
      setErro("Erro ao fazer login: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {erro && <p className="text-red-500">{erro}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
