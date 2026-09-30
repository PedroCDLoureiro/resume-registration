import { prisma } from '../lib/prisma';

export async function getCandidates() {
    return prisma.candidate.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function createCandidate(data: {
    fullName: string;
    email: string;
    phone?: string;
    desiredArea?: string;
    professionalSummary?: string;
}) {
    return prisma.candidate.create({
        data,
    });
}
