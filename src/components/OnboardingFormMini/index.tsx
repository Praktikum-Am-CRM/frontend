/* eslint-disable no-console */
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import {
  Checkbox,
  RadioGroup,
  Select,
  Text,
  TextInput,
} from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { onboardingMiniSchema } from '../../utils/validationSchema';
import {
  useCreateOnboardingMiniMutation,
  useGetActivitiesQuery,
  useGetGoalsQuery,
  useGetProgramsQuery,
} from '../../store/amCrm/amCrm.api';
import {
  ActivityType,
  GoalType,
  OnboardingMini,
  ProgramType,
} from '../../types/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram: any;
  }
}

const OnboardingFormMini = () => {
  const tg = window.Telegram.WebApp;
  const { data: programsList } = useGetProgramsQuery();
  const { data: goalsList } = useGetGoalsQuery();
  const { data: activitiesList } = useGetActivitiesQuery();
  const [createOnboardingMini] = useCreateOnboardingMiniMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(onboardingMiniSchema),
  });

  const programOptions =
    programsList?.map((program: ProgramType) => ({
      value: program.id,
      content: program.program_name,
    })) || [];

  const goalOptions =
    goalsList?.map((goal: GoalType) => ({
      value: goal.id,
      content: goal.goal_name,
    })) || [];

  // debugger;
  const activitiesOptions =
    activitiesList?.filter((activity: ActivityType) => activity.available) ||
    [];

  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityChange = (activityId: string) => {
    setSelectedActivities(currentActivities => {
      const newActivities = currentActivities.includes(activityId)
        ? currentActivities.filter(id => id !== activityId)
        : [...currentActivities, activityId];
      setValue('activity_id', newActivities);
      trigger('activity_id');
      return newActivities;
    });
  };

  const onSubmit = async (data: OnboardingMini) => {
    try {
      const response = await createOnboardingMini(data).unwrap();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }

    if (tg) {
      tg.sendData(JSON.stringify(data));
      tg.close();
    }
  };

  const genderOptions = [
    { value: '0', content: 'М' },
    { value: '1', content: 'Ж' },
  ];

  const selectedGoal = watch('goals');

  useEffect(() => {
    register('activity_id');
  }, [register]);

  useEffect(() => {
    setValue('activity_id', selectedActivities);
  }, [selectedActivities, setValue]);

  return (
    <div className={styles.root}>
      <Text variant="subheader-3">Анкета амбассадора</Text>
      <Text variant="body-3">
        Привет! Поздравляю, теперь ты — амбассадор Яндекс Практикума! Мы хотим
        познакомиться с тобой поближе, поэтому пройди, пожалуйста, этот опрос :)
      </Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Text>Представься, пожалуйста. Укажи свою фамилию и имя.</Text>
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
        </div>

        <div>
          <Text>Пол</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup
                aria-label="Пол"
                options={genderOptions}
                direction="horizontal"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Text>Твой ник в телеграм</Text>
          <TextInput
            size="l"
            {...register('telegram_id')}
            placeholder="Имя"
            error={Boolean(errors.first_name)}
            errorMessage={errors.first_name?.message}
          />
        </div>

        <div>
          <Controller
            name="programs"
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
          {errors.programs && (
            <Text variant="body-3" style={{ color: 'red' }}>
              {errors.programs.message}
            </Text>
          )}
        </div>

        <div>
          <Text>
            {`Адрес электронной почты.
            Та, через которую ты регистрировался в
            студенческой Пачке`}
          </Text>
          <TextInput
            size="l"
            {...register('email')}
            placeholder="email"
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        </div>

        <div>
          <Text>Укажи, пожалуйста, номер своего телефона</Text>
          <TextInput
            size="l"
            {...register('phone_number')}
            placeholder="Введите номер телефона"
            error={Boolean(errors.phone_number)}
            errorMessage={errors.phone_number?.message}
          />
        </div>

        <div>
          <Text>В какой стране ты проживаешь?</Text>
          <TextInput
            size="l"
            {...register('address_country')}
            placeholder="Укажи страну"
            error={Boolean(errors.address_country)}
            errorMessage={errors.address_country?.message}
          />
        </div>

        <div>
          <Text>Из какого ты города?</Text>
          <TextInput
            size="l"
            {...register('address_settlement')}
            placeholder="Укажи город"
            error={Boolean(errors.address_settlement)}
            errorMessage={errors.address_settlement?.message}
          />
        </div>

        <div>
          <Text variant="body-3">
            С какой целью ты пришел/пришла учиться в Практикум?
          </Text>
          <Controller
            control={control}
            name="goals"
            render={({ field }) => (
              <RadioGroup
                aria-label="Цель обучения"
                options={goalOptions}
                direction="vertical"
                {...field}
                value={field.value || ''}
                onChange={e => {
                  const newValue = e.target.value;
                  setValue('goals', newValue);
                  if (newValue !== 'f5b706ef-9a19-4a71-9af2-99a3d86543ec') {
                    setValue('own_version', undefined);
                  }
                }}
              />
            )}
          />

          {selectedGoal === 'f5b706ef-9a19-4a71-9af2-99a3d86543ec' && (
            <TextInput
              {...register('own_version')}
              placeholder="Укажите свою цель"
              error={Boolean(errors.own_version)}
              errorMessage={errors.own_version?.message}
            />
          )}
        </div>

        <div>
          <Text>Что хочешь делать в рамках амбассадорства?</Text>
          {activitiesOptions.map((activity: ActivityType) => (
            <Checkbox
              key={activity.id}
              content={activity.activity_name}
              checked={selectedActivities.includes(activity.id)}
              onChange={() => handleActivityChange(activity.id)}
            />
          ))}
          {errors.activity_id && (
            <Text variant="body-3" style={{ color: 'red' }}>
              {errors.activity_id.message}
            </Text>
          )}
        </div>

        <div>
          <Text>
            Оставь ссылку на свой блог (активную соцсеть, которую ты ведешь)
          </Text>
          <TextInput
            size="l"
            {...register('blog_link_uri')}
            placeholder="Ссылка"
            error={Boolean(errors.blog_link_uri)}
            errorMessage={errors.blog_link_uri?.message}
          />
        </div>

        <div>
          <Text>Где и кем ты работаешь сейчас?</Text>
          <TextInput
            size="l"
            {...register('place_work')}
            placeholder="Где"
            error={Boolean(errors.place_work)}
            errorMessage={errors.place_work?.message}
          />
          <TextInput
            size="l"
            {...register('specialty_work')}
            placeholder="Кем"
            error={Boolean(errors.specialty_work)}
            errorMessage={errors.specialty_work?.message}
          />
        </div>

        <div>
          <Text>
            Кто ты по образованию? Где учился/лась до Практикума и на кого?
          </Text>
          <TextInput
            size="l"
            {...register('educational_institution')}
            placeholder="Место учебы"
            error={Boolean(errors.educational_institution)}
            errorMessage={errors.educational_institution?.message}
          />
        </div>

        <div>
          <Text>
            Если ты хочешь рассказать о себе что-то еще, о чем мы еще не
            спросили, напиши об этом здесь
          </Text>
          <TextInput
            size="xl"
            {...register('note')}
            placeholder="Тут можно что то написать, если хочется"
            error={Boolean(errors.note)}
            errorMessage={errors.note?.message}
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default OnboardingFormMini;
