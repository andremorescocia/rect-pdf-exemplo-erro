import { pdf } from '@react-pdf/renderer';

interface IRelatorio {
  AbrirArquivo: () => void;
  DownloadArquivo: () => void;
  GetBlob: () => Blob;
}

interface IPDF {
  documento: Parameters<typeof pdf>[0];
}

const DownloadArquivo = (() => {
  const element = document.createElement('a');
  document.body.appendChild(element);
  element.style.display = 'none';

  return (blob: Blob, nomeArquivo: string) => {
    const url = window.URL.createObjectURL(blob);
    element.href = url;
    element.download = nomeArquivo;

    element.click();
  };
})();

export default async function PDF({ documento }: IPDF): Promise<IRelatorio> {
  const documentoPdf = pdf(documento);
  const blob = await documentoPdf.toBlob();

  return {
    AbrirArquivo: () => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    DownloadArquivo: () => {
      DownloadArquivo(blob, 'nome_pdf.pdf');
    },
    GetBlob: () => {
      return blob;
    },
  };
}
