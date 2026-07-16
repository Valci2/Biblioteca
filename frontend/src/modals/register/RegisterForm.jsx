// src/modals/register/RegisterForm.jsx
import { useState, useCallback } from 'react';
import { registerSchema } from './validation';
import Input from '../../components/common/input/Input';

const RegisterForm = ({ onSubmit, isSubmitting: externalSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState({});

  const validateField = useCallback(async (name, value) => {
    try {
      // Para confirmPassword, precisamos validar com o contexto completo
      if (name === 'confirmPassword') {
        await registerSchema.validateAt(name, { 
          [name]: value,
          password: formData.password 
        });
      } else {
        await registerSchema.validateAt(name, { [name]: value });
      }
      setErrors(prev => ({ ...prev, [name]: '' }));
      setIsValid(prev => ({ ...prev, [name]: true }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      setIsValid(prev => ({ ...prev, [name]: false }));
      return false;
    }
  }, [formData.password]);

  const validateForm = useCallback(async (data) => {
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
      const { confirmPassword, ...submitData } = formData;
      await onSubmit(submitData);
    }
  }, [formData, validateForm, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <Input
        label="Nome completo"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Seu nome completo"
        error={errors.name}
        touched={touched.name}
        isValid={isValid.name}
        disabled={externalSubmitting}
        autoComplete="name"
        required
        size="md"
        variant="default"
        icon="👤"
        showValidationMessages={true}
        showSuccessIcon={true}
        showErrorIcon={true}
      />
      
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
        icon="📧"
        showValidationMessages={true}
        showSuccessIcon={true}
        showErrorIcon={true}
      />
      
      <Input
        label="Senha"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Mínimo 6 caracteres"
        error={errors.password}
        touched={touched.password}
        isValid={isValid.password}
        disabled={externalSubmitting}
        autoComplete="new-password"
        required
        size="md"
        variant="default"
        showPasswordStrength={true}
        passwordValue={formData.password}
        showValidationMessages={true}
        showSuccessIcon={true}
        showErrorIcon={true}
      />
      
      <Input
        label="Confirmar senha"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirme sua senha"
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        isValid={isValid.confirmPassword}
        disabled={externalSubmitting}
        autoComplete="new-password"
        required
        size="md"
        variant="default"
        showValidationMessages={true}
        showSuccessIcon={true}
        showErrorIcon={true}
      />

      <button 
        type="submit" 
        className="submit-btn"
        disabled={externalSubmitting}
      >
        {externalSubmitting ? (
          <>
            <span className="spinner"></span>
            Cadastrando...
          </>
        ) : (
          'Cadastrar'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;