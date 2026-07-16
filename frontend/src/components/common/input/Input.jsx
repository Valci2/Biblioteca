// src/components/common/Input.jsx
import { forwardRef, useState } from 'react';

const Input = forwardRef(({
  // Propriedades básicas
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  required,
  autoComplete,
  className = '',
  
  // Validação
  error,
  touched,
  isValid,
  showSuccess = true,
  showValidationMessages = true, // Controla mensagens de texto
  showSuccessIcon = true, // Controla ícone de sucesso ✓
  showErrorIcon = true, // Controla ícone de erro ✕
  
  // Password strength
  showPasswordStrength = false,
  passwordValue = '',
  
  // Estilos
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'filled', 'outline'
  
  // Outros
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const getFieldStatus = () => {
    if (!touched) return '';
    if (error) return 'error';
    if (isValid) return 'success';
    return '';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'input-sm';
      case 'lg': return 'input-lg';
      default: return 'input-md';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'filled': return 'input-filled';
      case 'outline': return 'input-outline';
      default: return 'input-default';
    }
  };

  const getPasswordStrength = (password) => {
    if (!password || password.length === 0) return null;
    if (password.length < 6) return { label: 'Fraca', class: 'weak', percent: 33 };
    if (password.length < 8) return { label: 'Média', class: 'medium', percent: 66 };
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return { label: 'Forte', class: 'strong', percent: 100 };
    }
    return { label: 'Média', class: 'medium', percent: 66 };
  };

  const status = getFieldStatus();
  const strength = showPasswordStrength ? getPasswordStrength(passwordValue) : null;

  // Só mostra mensagens de validação se showValidationMessages for true
  const shouldShowError = error && touched && showValidationMessages;
  const shouldShowSuccess = isValid && touched && !error && showSuccess && showValidationMessages;

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      
      <div className={`input-container ${getSizeClasses()} ${getVariantClasses()} ${status}`}>
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon-left">{icon}</span>
        )}
        
        <input
          ref={ref}
          id={name}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          className="input-field"
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="input-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon-right">{icon}</span>
        )}
        
        {/* Ícones de status - controlados individualmente */}
        {showValidationMessages && status === 'success' && showSuccess && showSuccessIcon && (
          <span className="input-status-icon">✓</span>
        )}
        
        {showValidationMessages && status === 'error' && showErrorIcon && (
          <span className="input-status-icon">✕</span>
        )}
      </div>
      
      {/* Mensagens de validação */}
      {shouldShowError && (
        <span className="input-error-message">{error}</span>
      )}
      
      {shouldShowSuccess && (
        <span className="input-success-message">✓ Campo válido</span>
      )}
      
      {/* Força da senha - só mostra se showPasswordStrength for true */}
      {showPasswordStrength && strength && value.length > 0 && (
        <div className="password-strength">
          <span className="strength-label">
            Força da senha: <strong>{strength.label}</strong>
          </span>
          <div className="strength-bar">
            <div 
              className={`strength-fill ${strength.class}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;