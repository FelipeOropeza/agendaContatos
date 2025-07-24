import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import ContatoList from "../components/ContatoList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Agenda" },
    { name: "description", content: "Welcome to the Agenda!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  function handleCreateContact() {
    navigate("/create");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Agenda de Contatos</h1>

      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="button"
          onClick={handleCreateContact}
        >
          Criar Contato
        </button>
      </div>

      <ContatoList />
    </div>
  );
}
