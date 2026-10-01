import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />

                <main className="app-content">
                    <AppRoutes />
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
