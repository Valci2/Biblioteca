// src/modals/login/LoginModal.jsx
import { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from '../register/RegisterForm';
import './LoginModal.css';

// Configuração do Modal
Modal.setAppElement('#root');

const LoginModal = ({ 
  isOpen, 
  onClose,
  onLoginSuccess,
  onRegisterSuccess 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [globalError, setGlobalError] = useState(null);

  // Previne scroll quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset para o modo login quando o modal abre - CORRIGIDO
      setMode('login'); // Antes estava setMode(true)
      setGlobalError(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = useCallback(async (data) => {
    setIsSubmitting(true);
    setGlobalError(null);
    
    try {
      // Simula requisição à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      /* implementar a chamada para api mais tarde */
      
      // Chama o callback de sucesso
      onLoginSuccess?.(data);
      
      // Fecha o modal após o login
      onClose();
    } catch (error) {
      console.error('Erro no login:', error);
      setGlobalError(error.message || 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  }, [onLoginSuccess, onClose]);

  const handleRegister = useCallback(async (data) => {
    setIsSubmitting(true);
    setGlobalError(null);
    
    try {
      // Simula requisição à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      /* implementar a chamada para api mais tarde */
      
      // Chama o callback de sucesso
      onRegisterSuccess?.(data);
      
      // Após o registro bem-sucedido, volta para o login
      setMode('login');
    } catch (error) {
      console.error('Erro no registro:', error);
      setGlobalError(error.message || 'Erro ao fazer registro');
    } finally {
      setIsSubmitting(false);
    }
  }, [onRegisterSuccess]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setGlobalError(null);
    setIsSubmitting(false);
  }, []);

  const isLoginMode = mode === 'login';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={!isSubmitting}
      shouldCloseOnEsc={!isSubmitting}
    >
      <button 
        className="modal-close" 
        onClick={onClose}
        disabled={isSubmitting}
        aria-label="Fechar"
      >
        ✕
      </button>
      
      <div className="modal-header">
        <h1>
          {isLoginMode ? '🔐 Login' : '📝 Cadastro'}
        </h1>
        <p className="modal-subtitle">
          {isLoginMode 
            ? 'Faça login para acessar sua conta' 
            : 'Crie sua conta para começar'}
        </p>
      </div>

      {globalError && (
        <div className="error-banner" role="alert">
          {globalError}
        </div>
      )}
      
      {isLoginMode ? (
        <>
          <LoginForm 
            onSubmit={handleLogin}
            isSubmitting={isSubmitting}
          />
          <div className="modal-footer">
            <p>
              Não tem uma conta?{' '}
              <button 
                className="toggle-mode-btn"
                onClick={toggleMode}
                disabled={isSubmitting}
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <RegisterForm 
            onSubmit={handleRegister}
            isSubmitting={isSubmitting}
          />
          <div className="modal-footer">
            <p>
              Já tem uma conta?{' '}
              <button 
                className="toggle-mode-btn"
                onClick={toggleMode}
                disabled={isSubmitting}
              >
                Faça login
              </button>
            </p>
          </div>
        </>
      )}
    </Modal>
  );
};

export default LoginModal;