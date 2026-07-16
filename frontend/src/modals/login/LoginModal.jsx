// src/modals/login/LoginModal.jsx
import { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from '../register/RegisterForm';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

Modal.setAppElement('#root');

const LoginModal = ({ 
  isOpen, 
  onClose,
  onLoginSuccess,
  onRegisterSuccess 
}) => {
  const { login, register, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState('login');
  const [globalError, setGlobalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (user && isOpen) {
      onLoginSuccess?.(user);
      onClose();
    }
  }, [user, isOpen, onClose, onLoginSuccess]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMode('login');
      setGlobalError(null);
      setSuccessMessage(null);
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
    setSuccessMessage(null);
    
    try {
      const user = await login(data.email, data.password);
      onLoginSuccess?.(user);
      onClose();
    } catch (error) {
      console.error('Erro no login:', error);
      setGlobalError(error.message || 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  }, [login, onLoginSuccess, onClose]);

  const handleRegister = useCallback(async (data) => {
    setIsSubmitting(true);
    setGlobalError(null);
    setSuccessMessage(null);
    
    try {
      // Envia os dados para registro
      const response = await register(data);
      
      // Sucesso no registro - o backend retorna string
      setSuccessMessage(response || '✅ Conta criada com sucesso! Faça login para continuar.');
      
      // Chama callback de sucesso
      onRegisterSuccess?.(response);
      
      // Volta para o login após 2 segundos
      setTimeout(() => {
        setMode('login');
        setSuccessMessage(null);
      }, 2000);
      
    } catch (error) {
      console.error('Erro no registro:', error);
      setGlobalError(error.message || 'Erro ao fazer registro');
    } finally {
      setIsSubmitting(false);
    }
  }, [register, onRegisterSuccess]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setGlobalError(null);
    setSuccessMessage(null);
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
        <h1>{isLoginMode ? '🔐 Login' : '📝 Cadastro'}</h1>
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

      {successMessage && (
        <div className="success-banner" role="alert">
          {successMessage}
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