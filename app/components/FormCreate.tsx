import { useState } from "react";
import { inserirContato, type Contato } from "../api/contato";
import { useNavigate } from "react-router";

export default function ContatoForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Contato, "id">>({
    nome: "",
    telefone: "",
    email: "",
    aniversario: "",
    foto: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await inserirContato({ ...formData, id: 0 }); // id não é usado no insert
      navigate("/"); // volta para a lista de contatos
    } catch (err) {
      setError("Erro ao cadastrar contato. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Contato</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email ?? ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Data de Aniversário</label>
          <input
            type="date"
            name="aniversario"
            value={formData.aniversario ?? ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">URL da Foto</label>
          <input
            type="text"
            name="foto"
            value={formData.foto ?? ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="http://exemplo.com/foto.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
