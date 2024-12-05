import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Garanta que o elemento HTML com id "root" não será null
const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement) {
  throw new Error('Elemento root não encontrado no DOM.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se quiser monitorar o desempenho da aplicação, use esta função
// para logar os resultados ou enviar para um endpoint de análise.
// Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
