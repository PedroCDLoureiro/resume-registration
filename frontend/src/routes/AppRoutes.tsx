import { Routes, Route } from 'react-router-dom';
import CandidateRegistration from '../pages/CandidateRegistration';
import Candidates from '../pages/Candidates';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/new" element={<CandidateRegistration />} />
        </Routes>
    );
}

export default AppRoutes;
