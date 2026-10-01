import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCandidates } from '../services/candidateService';
import type { Candidate } from '../types/candidate';
import CandidateList from '../components/CandidateList';

function Candidates() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadCandidates() {
            try {
                const data = await getCandidates();
                setCandidates(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro ao buscar candidatos.');
                }
            } finally {
                setLoading(false);
            }
        }
        loadCandidates();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Candidatos</h1>
                    <p>Consulte e gerencie os candidatos cadastrados.</p>
                </div>

                <Link to="/candidates/new" className="page-header-button">
                    Novo candidato
                </Link>
            </div>

            {error && <p>{error}</p>}

            <CandidateList candidates={candidates} />
        </main>
    );
}

export default Candidates;
