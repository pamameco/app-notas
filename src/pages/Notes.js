import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [notaEditando, setNotaEditando] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/notes?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setNotas(data));
  }, [user.id]);

  const agregarNota = async () => {
    if (!titulo || !contenido) return;

    if (notaEditando) {
      const res = await fetch(`http://localhost:3001/notes/${notaEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...notaEditando, titulo, contenido }),
      });
      const updated = await res.json();
      setNotas(notas.map((n) => (n.id === updated.id ? updated : n)));
      setNotaEditando(null);
    } else {
      const res = await fetch(`http://localhost:3001/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, contenido, userId: user.id }),
      });
      const newNote = await res.json();
      setNotas([newNote, ...notas]);
    }

    setTitulo("");
    setContenido("");
  };

  const eliminarNota = async (id) => {
    await fetch(`http://localhost:3001/notes/${id}`, { method: "DELETE" });
    setNotas(notas.filter((n) => n.id !== id));
  };

  const editarNota = (nota) => {
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
    setNotaEditando(nota);
  };

  const notasFiltradas = notas.filter(
    (nota) =>
      nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      nota.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

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

      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Mis Notas</h2>

        <input
          type="text"
          placeholder="Buscar notas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={agregarNota}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          {notaEditando ? "Guardar cambios" : "Agregar Nota"}
        </button>

        <ul>
          {notasFiltradas.map((nota) => (
            <li
              key={nota.id}
              className="border p-4 rounded mb-2 flex justify-between items-center"
            >
              <span className="font-semibold">{nota.titulo}</span>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/notes/${nota.id}`)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Ver Nota
                </button>
                <button
                  onClick={() => editarNota(nota)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarNota(nota.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
