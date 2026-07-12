import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './validation';
import './LoginModal.css';

const LoginForm = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          placeholder="Digite seu email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
          autoFocus
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input 
          id="password"
          type="password" 
          placeholder="Digite sua senha"
          {...register('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>
      
      <button 
        type="submit" 
        className="btn-login"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;