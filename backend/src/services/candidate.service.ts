import { prisma } from '../lib/prisma';

export async function getCandidates() {
    return prisma.candidate.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}
