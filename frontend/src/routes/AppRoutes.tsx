import { Routes, Route } from 'react-router-dom';
import CandidateRegistration from '../pages/CandidateRegistration';
import Candidates from '../pages/Candidates';
import CandidateDetails from '../pages/CandidateDetails';
import CandidateEdit from '../pages/CandidateEdit';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/new" element={<CandidateRegistration />} />
            <Route path="/candidates/:id" element={<CandidateDetails />} />
            <Route path="/candidates/:id/edit" element={<CandidateEdit />} />
        </Routes>
    );
}

export default AppRoutes;
