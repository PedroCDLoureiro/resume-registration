import { describe, expect, it } from 'vitest';
import { extractCandidateData } from './candidateExtractor';

describe('extractCandidateData', () => {
    it('deve extrair nome, e-mail e telefone', () => {
        const text = `
      Pedro Loureiro
      Desenvolvedor Frontend
      pedro@email.com
      (41) 98765-4321
    `;

        const result = extractCandidateData(text);

        expect(result.fullName).toBe('Pedro Loureiro');
        expect(result.email).toBe('pedro@email.com');
        expect(result.phone).toBe('(41) 98765-4321');
    });
});

it('deve retornar undefined quando não encontrar os dados', () => {
    const text = `
    Currículo profissional

    Experiência com desenvolvimento web.
  `;

    const result = extractCandidateData(text);

    expect(result.fullName).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.phone).toBeUndefined();
});

it('deve extrair telefone sem formatação', () => {
    const text = `
    Pedro Loureiro
    pedro@email.com
    41987654321
  `;

    const result = extractCandidateData(text);

    expect(result.phone).toBe('41987654321');
});
