import { useEffect, useState } from "react";
import { listarContatos, type Contato } from "../api/contato";

export default function ContatoList() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);

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
          className="w-full max-w-md bg-amber-300 p-4 rounded-lg shadow-md flex gap-4"
        >
          {/* Foto (caso exista) */}
          {contato.foto ? (
            <img
              src={contato.foto}
              alt={`Foto de ${contato.nome}`}
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Sem Foto
            </div>
          )}

          {/* Dados do contato + ações */}
          <div className="flex-1">
            <h2 className="text-lg font-bold">{contato.nome}</h2>
            <p className="text-sm text-gray-700">📞 {contato.telefone}</p>
            <p className="text-sm text-gray-700">📧 {contato.email || "—"}</p>
            {contato.aniversario && (
              <p className="text-sm text-gray-700">
                🎂 {new Date(contato.aniversario).toLocaleDateString("pt-BR")}
              </p>
            )}

            {/* Botões de ação */}
            <div className="flex justify-end mt-4 gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Editar
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
