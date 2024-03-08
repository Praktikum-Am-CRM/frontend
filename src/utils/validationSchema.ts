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

export const timeSchema = yup.object({
  hours: yup
    .number()
    .min(0, 'Часы должны быть больше или равны 0')
    .max(23, 'Часы должны быть меньше или равны 23'),

  minutes: yup
    .number()
    .min(0, 'Минуты должны быть больше или равны 0')
    .max(59, 'Минуты должны быть меньше или равны 59'),
});
