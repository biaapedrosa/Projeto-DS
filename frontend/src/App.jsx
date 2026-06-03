import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Noticias from './pages/Noticias/Noticias';
import Institucional from './pages/Institucional/Institucional';
import Home from './pages/Home/Home';
import Historico from './pages/Historico/Historico';
import './index.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NutricionistaDashboard from './pages/Nutricionista/NutricionistaDashboard';
import PacienteDashboard from './pages/Paciente/PacienteDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Layout padrão com NavBar e Footer
function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1 }}>
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
          <Route path="/noticias" element={<Layout><Noticias /></Layout>} />
          <Route path="/historico" element={<PrivateRoute><Layout><Historico /></Layout></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/nutricionista/dashboard" element={<PrivateRoute><Layout><NutricionistaDashboard /></Layout></PrivateRoute>} />
          <Route path="/paciente/dashboard" element={<PrivateRoute><Layout><PacienteDashboard /></Layout></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute><Layout><AdminDashboard /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}