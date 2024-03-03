import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Неправильный формат почты')
      .required('Необходимо указать почту'),
    password: yup
      .string()
      .min(4, 'Пароль дожен содержать минимум 4 символа')
      .required('Требуется ввести пароль'),
  })
  .required();
