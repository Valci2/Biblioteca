// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Adiciona token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Response - Trata erros
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Se a resposta for uma string (como "Senha incorreta")
      const message = typeof data === 'string' ? data : data.message || 'Erro na requisição';
      
      switch (status) {
        case 401:
          // Não remove o token imediatamente, apenas redireciona se for erro de autenticação
          if (message.includes('Senha incorreta') || message.includes('não encontrado')) {
            // Erro de credenciais - não remove token
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('Acesso negado:', data);
          break;
        case 404:
          console.error('Recurso não encontrado:', data);
          break;
        case 409:
          console.error('Conflito:', data);
          break;
        case 500:
          console.error('Erro interno do servidor:', data);
          break;
        default:
          console.error('Erro na requisição:', data);
      }
      
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('Servidor não respondeu. Verifique sua conexão.'));
    } else {
      return Promise.reject(error);
    }
  }
);

// ===== API DE AUTENTICAÇÃO =====
export const authApi = {
  // Registro - retorna uma string: "Usuário cadastrado com sucesso!"
  register: async (userData) => {
    return api.post('/auth/register', {
      nome: userData.name,
      email: userData.email,
      senha: userData.password,
      tipo: userData.tipo || 'CLIENTE'
    });
  },

  // Login - retorna { token: "jwt_token" }
  login: async (credentials) => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      senha: credentials.password
    });
    
    // O backend retorna { token: "jwt_token" }
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  // Logout (opcional, se o backend tiver)
  logout: async () => {
    try {
      // Se tiver endpoint de logout
      // await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};

export default api;