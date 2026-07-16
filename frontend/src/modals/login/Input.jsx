// /Input.jsx
import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  disabled,
  autoComplete,
  required,
  className = '',
  ...props
}, ref) => {
  const showError = touched && error;
  
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={showError ? 'error' : ''}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${name}-error` : undefined}
        required={required}
        {...props}
      />
      {showError && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;