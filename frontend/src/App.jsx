// Importa o React — necessário para renderizar JSX
import React from 'react';

// Importa os componentes de roteamento do React Router DOM
// BrowserRouter: usa o histórico do navegador para navegação sem recarregar a página
// Routes: container que agrupa todas as rotas
// Route: define uma rota específica (caminho + componente a renderizar)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa o Provider de autenticação — envolve toda a app para compartilhar o estado de login
import { AuthProvider } from './context/AuthContext';

// Importa os componentes de layout que aparecem em todas as páginas
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Importa as páginas da aplicação
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Noticias from './pages/Noticias/Noticias';
import Institucional from './pages/Institucional/Institucional';
import Historico from './pages/Historico/Historico';

// Importa os estilos globais
import './index.css';

// Componente de layout padrão — envolve as páginas com NavBar no topo e Footer no rodapé
// O {children} representa o conteúdo da página que vem entre as tags <Layout>...</Layout>
// O minHeight: '100vh' garante que o footer sempre fique no final da tela
function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      {/* O flex: 1 faz o conteúdo principal crescer e empurrar o footer para o final */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Componente principal da aplicação — define a estrutura de rotas
export default function App() {
  return (
    // AuthProvider disponibiliza o estado de autenticação (usuário logado, funções de login/logout)
    // para todos os componentes filhos via Context API
    <AuthProvider>
      {/* BrowserRouter habilita a navegação entre páginas sem recarregar o browser */}
      <BrowserRouter>
        <Routes>
          {/* Página de login não tem NavBar nem Footer — tela limpa só com o formulário */}
          <Route path="/login" element={<Login />} />

          {/* Demais páginas usam o Layout padrão com NavBar e Footer */}
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
