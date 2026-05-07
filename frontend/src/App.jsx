import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Historico from './pages/Historico/Historico';
import Noticias from './pages/Noticias/Noticias';
import Institucional from './pages/Institucional/Institucional';
import NavBar from './components/NavBar/NavBar';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/institucional" element={<Institucional />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/institucional" />} />
      </Routes>
    </BrowserRouter>
  );
}
