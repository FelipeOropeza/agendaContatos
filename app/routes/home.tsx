import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

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
    <>
      <div>Welcome to the Agenda!</div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleCreateContact}
      >
        Create Contact
      </button>
    </>
  );
}
