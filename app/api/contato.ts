const API_URL = import.meta.env.VITE_API_URL;

export type Contato = {
  id: number;
  nome: string;
  telefone: string;
  email: string | null;
  aniversario: string | null;
  foto: string | null;
};

export async function listarContatos(): Promise<Contato[]> {
  const response = await fetch(`${API_URL}/contatos`);
  if (!response.ok) throw new Error("Erro ao buscar contatos.");
  const json = await response.json();
  return json.data;
}
