import type { Route } from "./+types/home";
import FormUpdate from "../components/FormUpdate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Update Contact" },
    { name: "description", content: "Update an existing contact in the agenda." },
  ];
}

export default function Update() {
  return <FormUpdate />;
}
