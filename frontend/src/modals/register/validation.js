import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letras maiúsculas, minúsculas e números'
    )
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmar senha é obrigatório')
}).required();



/**
 * @typedef {Object} RegisterFormData
 * @property {string} name - Nome completo
 * @property {string} email - Email do usuário
 * @property {string} password - Senha do usuário
 * @property {string} confirmPassword - Confirmação da senha
 */