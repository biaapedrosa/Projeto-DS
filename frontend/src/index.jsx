// Importa o React — necessário para usar JSX (a sintaxe de HTML dentro do JavaScript)
import React from 'react';

// Importa o ReactDOM, que é responsável por conectar o React ao HTML da página
// createRoot é a forma moderna (React 18+) de montar a aplicação no DOM
import ReactDOM from 'react-dom/client';

// Importa o componente raiz da aplicação, que contém todas as rotas e providers
import App from './App';

// Importa os estilos globais que se aplicam a toda a aplicação
import './index.css';

// Encontra o elemento <div id="root"> no HTML (definido em index.html)
// e cria o ponto de entrada do React dentro dele
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação dentro do StrictMode
// O StrictMode é uma ferramenta de desenvolvimento que ajuda a identificar problemas —
// ele chama certas funções duas vezes para detectar efeitos colaterais indesejados
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
