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
import { onboardingFullSchema } from '../../utils/validationSchema';
import {
  useCreateOnboardingMiniMutation,
  useGetActivitiesQuery,
  useGetGoalsQuery,
  useGetProgramsQuery,
} from '../../store/amCrm/amCrm.api';

import SizeClothing from '../../assets/images/sizeClothing.webp';
import { TEXTS } from '../../utils/constants';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram: any;
  }
}

const OnboardingFormFull = () => {
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
    resolver: yupResolver(onboardingFullSchema),
  });

  const programOptions =
    programsList?.map((program: ProgramType) => ({
      value: program.id,
      content: program.program_name,
    })) || [];

  const goalOptions =
    goalsList?.map((goal: GoalType) => ({
      value: goal.goal.id,
      content: goal.goal.goal_name,
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
          <Text>{TEXTS.ONBOARDING.PROGRAM}</Text>
          <Controller
            name="programs"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || []}
                placeholder="Выбери программу"
                size="m"
                className={styles.selectedProgramms}
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
            placeholder="email"
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.PHONE}</Text>
          <TextInput
            size="l"
            {...register('phone_number')}
            placeholder="Введите номер телефона"
            error={Boolean(errors.phone_number)}
            errorMessage={errors.phone_number?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.COUNTRY}</Text>
          <TextInput
            size="l"
            {...register('address_country')}
            placeholder="Укажи страну"
            error={Boolean(errors.address_country)}
            errorMessage={errors.address_country?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.FULL_ADDRESS}</Text>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Индекс</Text>
            <TextInput
              size="l"
              {...register('address_index')}
              placeholder="Индекс"
              error={Boolean(errors.address_index)}
              errorMessage={errors.address_index?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Область, край</Text>
            <TextInput
              size="l"
              {...register('address_region')}
              placeholder="Укажи область, край"
              error={Boolean(errors.address_region)}
              errorMessage={errors.address_region?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Район</Text>
            <TextInput
              size="l"
              {...register('address_district')}
              placeholder="Укажи Район"
              error={Boolean(errors.address_district)}
              errorMessage={errors.address_district?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>
              Город, населенный пункт
            </Text>
            <TextInput
              size="l"
              {...register('address_settlement')}
              placeholder="Укажи город"
              error={Boolean(errors.address_settlement)}
              errorMessage={errors.address_settlement?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Улица</Text>
            <TextInput
              size="l"
              {...register('address_street')}
              placeholder="Укажи Улицу"
              error={Boolean(errors.address_street)}
              errorMessage={errors.address_street?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Дом</Text>
            <TextInput
              size="l"
              {...register('address_house')}
              placeholder="Укажи дом"
              error={Boolean(errors.address_house)}
              errorMessage={errors.address_house?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Корпус</Text>
            <TextInput
              size="l"
              {...register('address_building')}
              placeholder="Укажи Корпус"
              error={Boolean(errors.address_building)}
              errorMessage={errors.address_building?.message}
            />
          </div>
          <div className={styles.fullAdressLine}>
            <Text className={styles.fullAdressQuestion}>Квартира</Text>
            <TextInput
              size="l"
              {...register('address_apartment')}
              placeholder="Квартира"
              error={Boolean(errors.address_apartment)}
              errorMessage={errors.address_apartment?.message}
            />
          </div>
        </div>

        <div>
          <Text variant="body-3">{TEXTS.ONBOARDING.GOAL_QUESTION}</Text>
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

          {selectedGoal === TEXTS.ONBOARDING.OWN_GOAL_ID && (
            <TextInput
              {...register('own_version')}
              placeholder="Укажите свою цель"
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
            placeholder="Ссылка"
            error={Boolean(errors.blog_link_uri)}
            errorMessage={errors.blog_link_uri?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.CURRENT_WORK}</Text>
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
          <Text>{TEXTS.ONBOARDING.EDUCATION}</Text>
          <TextInput
            size="l"
            {...register('educational_institution')}
            placeholder="Место учебы"
            error={Boolean(errors.educational_institution)}
            errorMessage={errors.educational_institution?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.ADDITIONAL_INFO}</Text>
          <TextInput
            size="xl"
            {...register('note')}
            placeholder="Тут можно что то написать, если хочется"
            error={Boolean(errors.note)}
            errorMessage={errors.note?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.ONBOARDING.CLOTHING_SIZE}</Text>
          <div className={styles.sizesSection}>
            <img
              src={SizeClothing}
              alt="Таблица размеров"
              className={styles.sizesImg}
            />
            <div>
              <Text>
                Обрати внимание на размерную сетку. Наши толстовки оверсайз,
                поэтому важно подобрать размер правильно
              </Text>
              <Controller
                name="size_clothing"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ? [field.value] : []}
                    placeholder="Выберите размер"
                    size="m"
                    className={styles.selectedSizes}
                    options={[
                      { value: 'XS', content: 'XS' },
                      { value: 'S', content: 'S' },
                      { value: 'M', content: 'M' },
                      { value: 'L', content: 'L' },
                      { value: 'XL', content: 'XL' },
                    ]}
                    onUpdate={value => {
                      field.onChange(value.length > 0 ? value[0] : '');
                    }}
                  />
                )}
              />
              {errors.size_clothing && (
                <Text variant="body-3" style={{ color: 'red' }}>
                  {errors.size_clothing.message}
                </Text>
              )}
            </div>
          </div>
        </div>

        <div>
          <div>
            <Text>{TEXTS.ONBOARDING.SHOE_SIZE}</Text>
            <Text>{TEXTS.ONBOARDING.SHOE_SIZE_NOTICE}</Text>
          </div>
          <TextInput
            size="l"
            {...register('size_shoe')}
            placeholder="Укажи размер обуви"
            error={Boolean(errors.size_shoe)}
            errorMessage={errors.size_shoe?.message}
          />
        </div>

        <Button type="submit" view="action" width="auto">
          {TEXTS.ONBOARDING.SUBMIT_BUTTON}
        </Button>
      </form>
    </div>
  );
};

export default OnboardingFormFull;
