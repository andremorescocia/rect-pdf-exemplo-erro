import React, { useState } from 'react';
import './App.css';
import pdfData from './PdfData.json'
import PDF from './PDF';
import GeneratorPdf from './GeneratorPdf';
import GeneratorPdfManually from './GeneratorPdfManually';

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

  async function handleGeneratePdfManually(): Promise<void> {
    const dados: any = pdfData;
    console.log('dados do json manual', dados);
    setCurrentState('Generating Pdf Manually... (about 30 seconds)');

    const relatorio = await PDF({
      documento: (
        <GeneratorPdfManually dados={dados} />
      ),
    });

    relatorio.AbrirArquivo();
    setCurrentState("Pdf finished!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{currentState}</h2>
        <button onClick={() => {handleGeneratePdf()}}>Button 1 - Click here to generate PDF with error and/or slowness</button>
        <br/>
        <button onClick={() => {handleGeneratePdfManually()}}>Button 2 - Click here to generate PDF with "manually pages"</button>
      </header>
    </div>
  );
};

export default App;
