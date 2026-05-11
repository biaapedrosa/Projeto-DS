import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Noticias from './pages/Noticias/Noticias';
import Institucional from './pages/Institucional/Institucional';
import Historico from './pages/Historico/Historico';
import './index.css';

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
          <Route path="/" element={<Layout><Institucional /></Layout>} />
          <Route path="/institucional" element={<Layout><Institucional /></Layout>} />
          <Route path="/noticias" element={<Layout><Noticias /></Layout>} />
          <Route path="/historico" element={<Layout><Historico /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}