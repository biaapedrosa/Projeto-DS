import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Institucional from './pages/Institucional';
import Home from './pages/Home';
import Historico from './pages/Historico';
import PrivateRoute from './components/PrivateRoute';
import NutricionistaDashboard from './pages/Nutricionista/Dashboard';
import PacienteDashboard from './pages/Paciente';
import AdminDashboard from './pages/Admin';
import ListaPacientes from './pages/Nutricionista/ListaPacientes';
import ProntuarioPaciente from './pages/Nutricionista/ProntuarioPaciente';
import DetalhePlano from './pages/Nutricionista/DetalhePlano';
import FichaMedica from './pages/FichaMedica/FichaMedica';
import FichaMedicaDetalhe from './pages/FichaMedica/FichaMedicaDetalhe';

// Layout padrão com NavBar e Footer
function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Redireciona /dashboard para o dashboard correto do usuário logado
function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.tipo === 'nutricionista' && user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.tipo === 'nutricionista') return <Navigate to="/nutricionista/dashboard" replace />;
  return <Navigate to="/paciente/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login sem NavBar e Footer */}
          <Route path="/login" element={<Login />} />

          {/* Redireciona /dashboard para o dashboard correto por tipo de usuário */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardRedirect /></PrivateRoute>} />

          {/* Páginas públicas com layout completo */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/institucional" element={<Layout><Institucional /></Layout>} />

          {/* Paciente */}
          <Route path="/historico" element={<PrivateRoute perfil="paciente"><Layout><Historico /></Layout></PrivateRoute>} />
          <Route path="/paciente/dashboard" element={<PrivateRoute perfil="paciente"><Layout><PacienteDashboard /></Layout></PrivateRoute>} />

          {/* Nutricionista */}
          <Route path="/nutricionista/dashboard" element={<PrivateRoute perfil="nutricionista"><Layout><NutricionistaDashboard /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/pacientes" element={<PrivateRoute perfil="nutricionista"><Layout><ListaPacientes /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id" element={<PrivateRoute perfil="nutricionista"><Layout><ProntuarioPaciente /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id/plano/:planoId" element={<PrivateRoute perfil="nutricionista"><Layout><DetalhePlano /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id/ficha-medica" element={<PrivateRoute perfil="nutricionista"><Layout><FichaMedica /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id/ficha/:consultaId" element={<PrivateRoute perfil="nutricionista"><Layout><FichaMedicaDetalhe /></Layout></PrivateRoute>} />
          <Route path="/ficha-medica" element={<PrivateRoute perfil="nutricionista"><Layout><FichaMedica /></Layout></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute perfil="nutricionista"><Layout><AdminDashboard /></Layout></PrivateRoute>} />

          {/* Qualquer rota não encontrada → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
