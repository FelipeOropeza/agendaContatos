import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Contact" },
    { name: "description", content: "Create a new contact in the agenda." },
  ];
}

export default function Create() {
  return <div>Create a new contact</div>;
}
