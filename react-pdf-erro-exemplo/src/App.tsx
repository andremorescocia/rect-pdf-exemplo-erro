import React, { useState } from 'react';
import './App.css';
import pdfData from './PdfData.json'
import PDF from './PDF';
import GeneratorPdf from './GeneratorPdf';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState("Hello!")

  async function handleGeneratePdf(): Promise<void> {
    const dados: any = pdfData;
    console.log('dados do json', dados);
    setCurrentState('Generating Pdf... (about 3 minutes)');

    const relatorio = await PDF({
      documento: (
        <GeneratorPdf dados={dados} />
      ),
    });

    relatorio.AbrirArquivo();
    setCurrentState("Pdf finished!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{currentState}</h2>
        <button onClick={() => {handleGeneratePdf()}}>Click here to generate PDF</button>
      </header>
    </div>
  );
};

export default App;
