import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // Login usando JSON Server
  const login = async (email, password) => {
    const res = await fetch(
      `http://localhost:3001/users?email=${email}&password=${password}`
    );
    const data = await res.json();
    if (data.length > 0) {
      setUser(data[0]);
      localStorage.setItem("currentUser", JSON.stringify(data[0]));
      return true;
    }
    return false;
  };

  // Registro usando JSON Server
  const register = async (email, password) => {
    // Verificar si el usuario ya existe
    const check = await fetch(`http://localhost:3001/users?email=${email}`);
    const existing = await check.json();
    if (existing.length > 0) return false;

    // Crear usuario
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
