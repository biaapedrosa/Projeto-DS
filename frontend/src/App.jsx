import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Institucional from './pages/Institucional';
import Home from './pages/Home';
import Historico from './pages/Historico';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import NutricionistaDashboard from './pages/Nutricionista/Dashboard';
import PacienteDashboard from './pages/Paciente';
import AdminDashboard from './pages/Admin';
import ListaPacientes from './pages/Nutricionista/ListaPacientes';
import ProntuarioPaciente from './pages/Nutricionista/ProntuarioPaciente';
import DetalhePlano from './pages/Nutricionista/DetalhePlano';

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login sem NavBar e Footer */}
          <Route path="/login" element={<Login />} />

          {/* Demais páginas com layout completo */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/institucional" element={<Layout><Institucional /></Layout>} />
          <Route path="/historico" element={<PrivateRoute><Layout><Historico /></Layout></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/dashboard" element={<PrivateRoute perfil="nutricionista"><Layout><NutricionistaDashboard /></Layout></PrivateRoute>} />
          <Route path="/paciente/dashboard" element={<PrivateRoute perfil="paciente"><Layout><PacienteDashboard /></Layout></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute><Layout><AdminDashboard /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/pacientes" element={<PrivateRoute><Layout><ListaPacientes /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id" element={<PrivateRoute><Layout><ProntuarioPaciente /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/paciente/:id/plano/:planoId" element={<PrivateRoute><Layout><DetalhePlano /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}