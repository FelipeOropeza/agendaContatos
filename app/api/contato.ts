const API_URL = import.meta.env.VITE_API_URL;

export type Contato = {
  id: number;
  nome: string;
  telefone: string;
  email: string | null;
  aniversario: string | null;
  foto: string | null;
  foto_url: string;
};

export async function listarContatos(): Promise<Contato[]> {
  const response = await fetch(`${API_URL}/contatos`);
  if (!response.ok) throw new Error("Erro ao buscar contatos.");
  const json = await response.json();
  return json.data;
}

export async function inserirContato(data: FormData): Promise<Contato> {
  const response = await fetch(`${API_URL}/contatos`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) throw new Error("Erro ao inserir contato.");
  const json = await response.json();
  return json.data;
}

export async function excluirContato(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/contatos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir contato.");
}
