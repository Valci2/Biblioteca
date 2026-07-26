import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="content" style={{ padding: '2rem' }}>
          <AppRoutes />
        </div>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;