import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import './LoginModal.css';

// Configuração do Modal
Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    console.log('Dados do login:', data);
    
    try {
      // Simula requisição à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      /* implementar a chamada para api mais tarde */
      
      // Fecha o modal após o login
      onClose();
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setIsSubmitting(false);
    }
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
      
      <div className="modal-header">
        <h1>🔐 Login</h1>
        <p className="modal-subtitle">Faça login para acessar sua conta</p>
      </div>
      
      <LoginForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};

export default LoginModal;