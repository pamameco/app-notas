import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [nota, setNota] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userId === user.id) setNota(data);
      });
  }, [id, user.id]);

  if (!nota) return <p className="p-6 text-center text-red-500">Nota no encontrada</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <span className="font-semibold">Usuario activo: {user.email}</span>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Desconectar
        </button>
      </nav>

      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{nota.titulo}</h2>
        <p className="mb-4">{nota.contenido}</p>
        <button
          onClick={() => navigate("/notes")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver a Notas
        </button>
      </div>
    </div>
  );
}
