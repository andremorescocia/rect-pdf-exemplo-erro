import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { Font } from '@react-pdf/renderer';

import tinos from './Assets/fonts/tinos/tinos.ttf';
import tinosBold from './Assets/fonts/tinos/tinos_bold.ttf';
import tinosItalic from './Assets/fonts/tinos/tinos_italic.ttf';
import tinosBoldItalic from './Assets/fonts/tinos/tinos_bold_italic.ttf';

Font.register({
  family: 'Tinos',
  fonts: [
    {
      src: tinos,
    },
    {
      src: tinosBold,
      fontWeight: 'bold',
    },
    {
      src: tinosItalic,
      fontStyle: 'italic',
    },
    {
      src: tinosBoldItalic,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

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
