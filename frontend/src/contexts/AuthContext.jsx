// src/context/AuthContext.jsx
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import api, {authApi} from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar os dados do user
  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/me');
      setUser(response);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
      await logout();
    }
  };

  // Carregar usuário ao iniciar se houver token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        await fetchUserData();
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      console.log('Resposta do login:', response);
      
      // O backend retorna { token: "jwt_token" }
      const { token } = response;
      
      // Salva o token e informações do usuário
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserData();

      return true;
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    }
  }, []);

  // Registro
  const register = useCallback(async (userData) => {
    setError(null);
    try {
      return await authApi.register(userData); // "Usuário cadastrado com sucesso!"
    } catch (err) {
      let errorMessage = err.message || 'Erro ao fazer registro';
      
      // Tratamento de erros comuns
      if (err.message?.toLowerCase().includes('email já cadastrado') || 
          err.message?.toLowerCase().includes('duplicate entry') ||
          err.message?.toLowerCase().includes('unique')) {
        errorMessage = 'Este email já está cadastrado. Tente fazer login.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  // Atualizar usuário
  const updateUser = useCallback((updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, [user]);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user && !!localStorage.getItem('token'),
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};