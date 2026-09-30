import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
