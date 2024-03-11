/* eslint-disable no-console */
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  RadioGroup,
  Select,
  Text,
  TextInput,
} from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
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
  OnboardingMiniType,
  ProgramType,
} from '../../types/types';

import { TEXTS } from '../../utils/constants';

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

  const onSubmit = async (data: OnboardingMiniType) => {
    try {
      await createOnboardingMini(data);
      toaster.add({
        name: 'onboarding-full-ok',
        title: 'Данные отправлены',
        actions: [
          {
            label: 'ОК',
            removeAfterClick: true,
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      toaster.add({
        name: 'onboarding-full-err',
        title: 'Произошла ошибка',
        content: 'Данные не отправлены',
        actions: [
          {
            label: 'ОК',
            removeAfterClick: true,
            onClick: () => {},
          },
        ],
      });
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
      <Text variant="subheader-3">{TEXTS.ONBOARDING.SUBHEADER}</Text>
      <Text variant="body-3">{TEXTS.ONBOARDING.INTRO_TEXT}</Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Text>{TEXTS.ONBOARDING.NAME_SURNAME}</Text>
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
          <Text>{TEXTS.ONBOARDING.GENDER}</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup
                aria-label={TEXTS.ONBOARDING.GENDER}
                options={genderOptions}
                direction="horizontal"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.NICKNAME}</Text>
          <TextInput
            size="l"
            {...register('telegram_id')}
            placeholder="Никнейм"
            error={Boolean(errors.telegram_id)}
            errorMessage={errors.telegram_id?.message}
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
                placeholder={TEXTS.ONBOARDING.PROGRAM}
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
          <Text>{TEXTS.ONBOARDING.EMAIL}</Text>
          <TextInput
            size="l"
            {...register('email')}
            placeholder="Email"
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.PHONE}</Text>
          <TextInput
            size="l"
            {...register('phone_number')}
            placeholder="Номер телефона"
            error={Boolean(errors.phone_number)}
            errorMessage={errors.phone_number?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.COUNTRY}</Text>
          <TextInput
            size="l"
            {...register('address_country')}
            placeholder="Страна"
            error={Boolean(errors.address_country)}
            errorMessage={errors.address_country?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.FULL_ADDRESS}</Text>
          <TextInput
            size="l"
            {...register('address_settlement')}
            placeholder="Полный адрес"
            error={Boolean(errors.address_settlement)}
            errorMessage={errors.address_settlement?.message}
          />
        </div>

        <div>
          <Text variant="body-3">{TEXTS.ONBOARDING.GOAL_QUESTION}</Text>
          <Controller
            control={control}
            name="goals"
            render={({ field }) => (
              <RadioGroup
                aria-label={TEXTS.ONBOARDING.GOAL_QUESTION}
                options={goalOptions}
                direction="vertical"
                {...field}
                value={field.value || ''}
                onChange={e => {
                  const newValue = e.target.value;
                  setValue('goals', newValue);
                  if (newValue !== TEXTS.ONBOARDING.OWN_GOAL_ID) {
                    setValue('own_version', undefined);
                  }
                }}
              />
            )}
          />

          {selectedGoal === TEXTS.ONBOARDING.OWN_GOAL_ID && (
            <TextInput
              {...register('own_version')}
              placeholder="Ваша цель"
              error={Boolean(errors.own_version)}
              errorMessage={errors.own_version?.message}
            />
          )}
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.AMBASSADOR_ACTIVITY_QUESTION}</Text>
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
          <Text>{TEXTS.ONBOARDING.BLOG_LINK}</Text>
          <TextInput
            size="l"
            {...register('blog_link_uri')}
            placeholder="Ссылка на блог"
            error={Boolean(errors.blog_link_uri)}
            errorMessage={errors.blog_link_uri?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.CURRENT_WORK}</Text>
          <TextInput
            size="l"
            {...register('place_work')}
            placeholder="Место работы"
            error={Boolean(errors.place_work)}
            errorMessage={errors.place_work?.message}
          />
          <TextInput
            size="l"
            {...register('specialty_work')}
            placeholder="Специальность"
            error={Boolean(errors.specialty_work)}
            errorMessage={errors.specialty_work?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.EDUCATION}</Text>
          <TextInput
            size="l"
            {...register('educational_institution')}
            placeholder="Образовательное учреждение"
            error={Boolean(errors.educational_institution)}
            errorMessage={errors.educational_institution?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.ADDITIONAL_INFO}</Text>
          <TextInput
            size="xl"
            {...register('note')}
            placeholder="Дополнительная информация"
            error={Boolean(errors.note)}
            errorMessage={errors.note?.message}
          />
        </div>

        <Button type="submit" view="action" width="auto">
          {TEXTS.ONBOARDING.SUBMIT_BUTTON}
        </Button>
      </form>
    </div>
  );
};

export default OnboardingFormMini;
