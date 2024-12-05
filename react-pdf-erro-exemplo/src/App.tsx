import React from 'react';
import './App.css';
import pdfData from './PdfData.json'
import PDF from './PDF';
import GeneratorPdf from './GeneratorPdf';

const App: React.FC = () => {
  async function handleGeneratePdf(): Promise<void> {

    const dados: any = pdfData;

    console.log('dados do json', dados);

    const relatorio = await PDF({
      documento: (
        <GeneratorPdf dados={dados} />
      ),
    });

    relatorio.AbrirArquivo();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello, TypeScript!</h2>
        <button onClick={async () => {await handleGeneratePdf()}}>Click here to generate PDF</button>
      </header>
    </div>
  );
};

export default App;
