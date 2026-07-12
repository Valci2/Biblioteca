import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../../modals/login/LoginModal';
import './Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">MeuApp</Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          {/* Botão que abre o modal em vez de link */}
          <button onClick={openModal} className="btn-login-nav">
            Login
          </button>
        </div>
      </nav>

      {/* Modal de Login */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;