import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="App">  {/* ← Adicione uma div wrapper */}
        <Navbar />
        <div className="content" style={{ padding: '2rem' }}>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;