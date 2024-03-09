import styles from './styles.module.css';
import { RadioGroup, Select, Text, TextInput } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateOnboardingMiniMutation } from '../../store/amCrm/amCrm.api';
import { OnboardingMini } from '../../types/types';

import { PROGRAMS_LIST } from '../../utils/mockProgrammsList';

const schema = yup
  .object({
    last_name: yup
      .string()
      .required('Требуется ввести имя')
      .min(2, 'Минимум два символа')
      .max(20, 'Максимум 20 символов'),
    first_name: yup
      .string()
      .required('Требуется ввести фамилию')
      .min(2, 'Минимум два символа')
      .max(20, 'Максимум 20 символов'),
    sex: yup.string().oneOf(['0', '1']).required('Требуется выбрать пол'),
    telegram_nickname: yup.string().required(),
    program_id: yup.array().required('Требуется выбрать программу'),
    // email: yup.string().email().required(),
    // phone_number: yup
    //   .number()
    //   .typeError('Phone number must be a number')
    //   .required(),
    // address_country: yup.string().required(),
    // address_settlement: yup.string().required(),
    // blog_link_uri: yup.string().url(),
    // place_work: yup.string(),
    // specialty_work: yup.string(),
    // educational_institution: yup.string(),
    // note: yup.string(),

    // goal_id: yup.string().required(),
    // own_version: yup.string(),
    // activity_id: yup.string().required(),
  })
  .required();

const OnboardingFormMini = () => {
  const [createOnboardingMini] = useCreateOnboardingMiniMutation();

  const programOptions = PROGRAMS_LIST.map(program => ({
    value: program.id,
    content: program.program_name,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: OnboardingMini) => {
    try {
      const response = await createOnboardingMini(data).unwrap();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sexOptions = [
    { value: '0', content: 'М' },
    { value: '1', content: 'Ж' },
  ];

  return (
    <div className={styles.root}>
      <Text variant="subheader-3">Анкета амбассадора</Text>
      <Text variant="body-3">
        Привет! Поздравляю, теперь ты — амбассадор Яндекс Практикума! Мы хотим
        познакомиться с тобой поближе, поэтому пройди, пожалуйста, этот опрос :)
      </Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Text>
          Представься, пожалуйста. Укажи свою фамилию, имя и отчество.
        </Text>
        <div className={styles.nameSurname}>
          <TextInput
            size="l"
            {...register('last_name')}
            placeholder="Фамилия"
            error={Boolean(errors.last_name)}
            errorMessage={errors.last_name?.message}
          />
          <TextInput
            size="l"
            {...register('first_name')}
            placeholder="Имя"
            error={Boolean(errors.first_name)}
            errorMessage={errors.first_name?.message}
          />
        </div>

        <div>
          <Text>Пол</Text>
          <Controller
            control={control}
            name="sex"
            render={({ field }) => (
              <RadioGroup
                aria-label="Пол"
                options={sexOptions}
                direction="vertical"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Text>Твой ник в телеграм</Text>
          <TextInput
            size="l"
            {...register('telegram_nickname')}
            placeholder="Имя"
            error={Boolean(errors.first_name)}
            errorMessage={errors.first_name?.message}
          />
        </div>

        <div>
          <Controller
            name="program_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || []}
                placeholder="Выбери программу, на которой ты учишься или учился/лась"
                size="m"
                multiple
                options={programOptions}
                onUpdate={e => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default OnboardingFormMini;
