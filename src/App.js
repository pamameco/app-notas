import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail"; // Nueva página

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <PrivateRoute>
                <NoteDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
