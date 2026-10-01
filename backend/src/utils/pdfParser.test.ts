import { describe, expect, it } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { extractPdfText } from './pdfParser';

describe('extractPdfText', () => {
    it('deve extrair texto de um arquivo PDF', async () => {
        const buffer = await fs.readFile(path.resolve('test/curriculum.pdf'));

        const text = await extractPdfText(buffer);

        expect(text).toBeTruthy();
        expect(text).toContain('Pedro');
        expect(text).toContain('@');
    });
});
