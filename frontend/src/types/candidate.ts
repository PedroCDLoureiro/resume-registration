export interface Candidate {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    desiredArea?: string;
    professionalSummary?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCandidateData {
    fullName: string;
    email: string;
    phone?: string;
    desiredArea?: string;
    professionalSummary?: string;
}
