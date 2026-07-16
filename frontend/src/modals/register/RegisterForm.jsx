// src/modals/register/RegisterForm.jsx
import { useState } from 'react';
import * as yup from 'yup';
import { registerSchema } from './validation';

const RegisterForm = ({ onSubmit, isSubmitting: externalSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = async (name, value) => {
    try {
      await registerSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      return false;
    }
  };

  const validateForm = async (data) => {
    try {
      await registerSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      await validateField(name, value);
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    await validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    const isValid = await validateForm(formData);
    if (isValid) {
      const { confirmPassword, ...submitData } = formData;
      await onSubmit(submitData);
    }
  };

  const isSubmitting = externalSubmitting;

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Nome completo</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Seu nome completo"
          disabled={isSubmitting}
          className={touched.name && errors.name ? 'error' : ''}
          required
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="seu@email.com"
          disabled={isSubmitting}
          className={touched.email && errors.email ? 'error' : ''}
          required
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Mínimo 6 caracteres"
          disabled={isSubmitting}
          className={touched.password && errors.password ? 'error' : ''}
          required
        />
        {touched.password && errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirme sua senha"
          disabled={isSubmitting}
          className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
          required
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default RegisterForm;