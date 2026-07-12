import { useEffect } from 'react';
import Modal from 'react-modal';
import './LoginModal.css';

// IMPORTANTE: Configura o elemento root para acessibilidade
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const LoginModal = ({ isOpen, onClose }) => {
  // Previne scroll quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login realizado!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button className="modal-close" onClick={onClose}>
        ✕
      </button>
      
      <h1>🔐 Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Digite seu email" 
            required 
            autoFocus
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            required 
          />
        </div>
        
        <button type="submit" className="btn-login">
          Entrar
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;