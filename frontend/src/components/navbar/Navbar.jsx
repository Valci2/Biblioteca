import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../../modals/login/LoginModal';
import './Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Biblioteca</Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/">Home</Link>

          {user ? (
            <Link to="/perfil" className="btn-profile">
              <img 
                src={user.avatar || '/default-avatar.png'} 
                alt="Perfil"
                className="avatar-icon"
              />
              <span>{user.nome || 'Perfil'}</span>
            </Link>
          ) : (
            <button onClick={openModal} className="btn-login-nav">
              Login
            </button>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;