import fs from 'node:fs/promises';
import { extractPdfText } from './utils/pdfParser';

async function testPdf() {
    const buffer = await fs.readFile('./test/pdf_curriculo.pdf');

    const text = await extractPdfText(buffer);

    console.log('Texto extraído do PDF:');
    console.log(text);
}

testPdf();
