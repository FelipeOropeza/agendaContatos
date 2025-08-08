import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listarContatos, excluirContato, type Contato } from "../api/contato";

export default function ContatoList() {
  const navigate = useNavigate();
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      try {
        await excluirContato(id);
        setContatos((prev) => prev.filter((contato) => contato.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    listarContatos()
      .then(setContatos)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Carregando contatos...</p>;
  if (contatos.length === 0)
    return <p className="text-center">Nenhum contato encontrado.</p>;

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      {contatos.map((contato) => (
        <div
          key={contato.id}
          className="w-full max-w-md p-4 rounded-lg shadow-md flex gap-4"
        >
          {contato.foto ? (
            <img
              src={contato.foto_url}
              alt={`Foto de ${contato.nome}`}
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Sem Foto
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-lg font-bold">{contato.nome}</h2>
            <p className="text-sm text-gray-700">📞 {contato.telefone}</p>
            <p className="text-sm text-gray-700">📧 {contato.email || "—"}</p>
            {contato.aniversario && (
              <p className="text-sm text-gray-700">
                🎂 {new Date(contato.aniversario).toLocaleDateString("pt-BR")}
              </p>
            )}

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => navigate(`/update/${contato.id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(contato.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
