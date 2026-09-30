import { Routes, Route } from 'react-router-dom';
import CandidateRegistration from '../pages/CandidateRegistration';
import Candidates from '../pages/Candidates';
import CandidateDetails from '../pages/CandidateDetails';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/new" element={<CandidateRegistration />} />
            <Route path="/candidates/:id" element={<CandidateDetails />} />
        </Routes>
    );
}

export default AppRoutes;
