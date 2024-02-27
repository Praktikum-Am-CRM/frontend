import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Неправильный формат почты')
      .required('Необходимо указать почту'),
    password: yup.string().required('Требуется ввести пароль'),
  })
  .required();
