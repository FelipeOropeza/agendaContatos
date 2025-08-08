import { useState, useEffect } from "react";
import {
  atualizarContato,
  buscarContatoPorId,
  type Contato,
} from "../api/contato";
import { useNavigate, useParams } from "react-router";

export default function ContatoFormUpdate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Omit<Contato, "id" | "foto">>({
    nome: "",
    telefone: "",
    email: "",
    aniversario: "",
    foto_url: "",
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarContato() {
      try {
        const contato = await buscarContatoPorId(Number(id));
        setFormData({
          nome: contato.nome,
          telefone: contato.telefone,
          email: contato.email ?? "",
          aniversario: contato.aniversario ?? "",
          foto_url: contato.foto ?? "",
        });
      } catch {
        setError("Erro ao carregar dados do contato.");
      }
    }
    carregarContato();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("nome", formData.nome);
      data.append("telefone", formData.telefone);
      data.append("email", formData.email ?? "");
      data.append("aniversario", formData.aniversario ?? "");
      if (fotoFile) {
        data.append("foto", fotoFile);
      }
      data.append("_method", "PUT");

      await atualizarContato(Number(id), data);
      navigate("/");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Erro ao atualizar contato. Verifique os dados e tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Atualizar Contato</h2>

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
          <label className="block font-medium">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
        >
          {loading ? "Salvando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}
