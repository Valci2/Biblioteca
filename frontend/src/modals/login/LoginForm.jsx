// src/modals/login/LoginForm.jsx
import { useState, useCallback } from 'react';
import { loginSchema } from './validation';
import Input from '../../components/common/input/Input';

const LoginForm = ({ onSubmit, isSubmitting: externalSubmitting }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState({});

  const validateField = useCallback(async (name, value) => {
    try {
      await loginSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
      setIsValid(prev => ({ ...prev, [name]: true }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      setIsValid(prev => ({ ...prev, [name]: false }));
      return false;
    }
  }, []);

  const validateForm = useCallback(async (data) => {
    try {
      await loginSchema.validate(data, { abortEarly: false });
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
  }, []);

  const handleChange = useCallback(async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      await validateField(name, value);
    }
  }, [touched, validateField]);

  const handleBlur = useCallback(async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    await validateField(name, value);
  }, [validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    const isValid = await validateForm(formData);
    if (isValid) {
      await onSubmit(formData);
    }
  }, [formData, validateForm, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="seu@email.com"
        error={errors.email}
        touched={touched.email}
        isValid={isValid.email}
        disabled={externalSubmitting}
        autoComplete="email"
        required
        size="md"
        variant="default"
        showValidationMessages={false}
        showSuccessIcon={false}
        showErrorIcon={false}
      />
      
      <Input
        label="Senha"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Sua senha"
        error={errors.password}
        touched={touched.password}
        isValid={isValid.password}
        disabled={externalSubmitting}
        autoComplete="current-password"
        required
        size="md"
        variant="default"
        showPasswordStrength={false}
        passwordValue={formData.password}
        showValidationMessages={false}
        showSuccessIcon={false}
        showErrorIcon={false}
      />

      <button 
        type="submit" 
        className="submit-btn"
        disabled={externalSubmitting}
      >
        {externalSubmitting ? (
          <>
            <span className="spinner"></span>
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </button>
    </form>
  );
};

export default LoginForm;