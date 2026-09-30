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

export async function getCandidateById(id: number) {
    return prisma.candidate.findUnique({
        where: {
            id,
        },
    });
}

export async function updateCandidate(
    id: number,
    data: {
        fullName: string;
        email: string;
        phone?: string;
        desiredArea?: string;
        professionalSummary?: string;
    }
) {
    return prisma.candidate.update({
        where: {
            id,
        },
        data,
    });
}

export async function deleteCandidate(id: number) {
    return prisma.candidate.delete({
        where: {
            id,
        },
    });
}
