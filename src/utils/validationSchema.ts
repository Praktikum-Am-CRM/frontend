import * as yup from 'yup';

const urlPattern =
  /^(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

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

export const onboardingMiniSchema = yup
  .object({
    last_name: yup
      .string()
      .required('Требуется ввести фамилию')
      .min(2, 'Минимум два символа')
      .max(20, 'Максимум 20 символов'),
    first_name: yup
      .string()
      .required('Требуется ввести имя')
      .min(2, 'Минимум два символа')
      .max(20, 'Максимум 20 символов'),
    gender: yup.string().oneOf(['0', '1']).required('Требуется выбрать пол'),
    telegram_id: yup.string().required('Требуется уазать никнейм в телеграм'),
    programs: yup.array().required('Требуется выбрать программу'),
    email: yup
      .string()
      .email('Введите валидный адрес электронной почты')
      .required('Требуется ввести адрес электронной почты'),
    phone_number: yup
      .string()
      .required('Требуется ввести номер телефона')
      .matches(/^[0-9]+$/, 'Номер телефона должен содержать только цифры')
      .min(7, 'Номер телефона должен содержать не менее 7 цифр')
      .max(15, 'Номер телефона должен содержать не более 15 цифр'),
    address_country: yup
      .string()
      .required('Требуется указать страну проживания'),
    address_settlement: yup
      .string()
      .required('Требуется указать город проживания'),
    goals: yup.string().required('Требуется выбрать цель').nullable(),
    own_version: yup.string(),
    activity_id: yup
      .array()
      .of(yup.string())
      .min(1, 'Выберите хотя бы одну активность')
      .required('Требуется выбрать активность'),
    blog_link_uri: yup
      .string()
      .matches(urlPattern, 'Введите валидный URL')
      .required('Требуется указать URL блога или активной соцсети'),
    place_work: yup.string().required('Требуется указать место работы'),
    specialty_work: yup
      .string()
      .required('Требуется указать специальность на текущей работе'),
    educational_institution: yup
      .string()
      .required('Требуется указать образовательное учреждение'),
    note: yup
      .string()
      .max(1000, 'Примечание не должно превышать 1000 символов'),
  })
  .required();
