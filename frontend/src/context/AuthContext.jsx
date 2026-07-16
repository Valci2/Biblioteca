// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Erro ao restaurar sessão:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      
      // O backend retorna { token: "jwt_token" }
      const { token } = response;
      
      // Salva o token
      localStorage.setItem('token', token);
      
      // Salva informações básicas do usuário
      const userData = { email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    }
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    try {
      // Envia os dados para a API
      const response = await authApi.register(userData);
      
      // O backend retorna uma string: "Usuário cadastrado com sucesso!"
      return response;
    } catch (err) {
      // Trata erros específicos do registro
      let errorMessage = err.message || 'Erro ao fazer registro';
      
      // Erros comuns do backend
      if (err.message?.toLowerCase().includes('email já cadastrado') || 
          err.message?.toLowerCase().includes('duplicate entry') ||
          err.message?.toLowerCase().includes('unique')) {
        errorMessage = 'Este email já está cadastrado. Tente fazer login.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

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