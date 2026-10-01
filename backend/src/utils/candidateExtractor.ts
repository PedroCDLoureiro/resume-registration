const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const phoneRegex = /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}|\d{4})[-.\s]?\d{4}/;

const ignoredLines = [
    'currículo',
    'curriculo',
    'resume',
    'dados pessoais',
    'informações pessoais',
    'informacoes pessoais',
    'contato',
    'perfil',
    'objetivo',
    'experiência',
    'experiencia',
    'formação',
    'formacao',
    'habilidades',
    'skills',
];

export function extractEmail(text: string): string | undefined {
    const match = text.match(emailRegex);

    return match?.[0];
}

export function extractPhone(text: string): string | undefined {
    const match = text.match(phoneRegex);

    return match?.[0];
}

function isLikelyName(line: string): boolean {
    const normalized = line.trim().toLowerCase();

    if (!line) {
        return false;
    }

    if (ignoredLines.includes(normalized)) {
        return false;
    }

    if (emailRegex.test(line)) {
        return false;
    }

    if (phoneRegex.test(line)) {
        return false;
    }

    if (/\d/.test(line)) {
        return false;
    }

    const words = line.split(/\s+/);

    if (words.length < 2 || words.length > 6) {
        return false;
    }

    if (!/^[\p{L}\s.'-]+$/u.test(line)) {
        return false;
    }

    return true;
}

export function extractName(text: string): string | undefined {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const emailIndex = lines.findIndex((line) => emailRegex.test(line));

    if (emailIndex === -1) {
        return undefined;
    }

    const possibleLines = lines.slice(0, emailIndex);

    for (const line of possibleLines) {
        if (isLikelyName(line)) {
            return line;
        }
    }

    return undefined;
}

export function extractCandidateData(text: string) {
    return {
        fullName: extractName(text),
        email: extractEmail(text),
        phone: extractPhone(text),
    };
}
