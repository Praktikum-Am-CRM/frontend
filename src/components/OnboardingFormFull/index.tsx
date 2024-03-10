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
import { onboardingFullSchema } from '../../utils/validationSchema';
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
import SizeClothing from '../../assets/images/sizeClothing.webp';

const OnboardingFormFull = () => {
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

  const onSubmit = async (data: OnboardingMiniType) => {
    try {
      const response = await createOnboardingMini(data).unwrap();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
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
          <Text>Выбери программу, на которой ты учишься или учился/лась</Text>
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
          <Text>Напиши, пожалуйста полный адрес</Text>
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

        <div>
          <Text>
            Размер одежды, который ты обычно носишь (на фото представлена
            размерная сетка толстовок)
          </Text>
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

        <div className={styles.fullAdressLine}>
          <div>
            <Text className={styles.fullAdressQuestion}>Твой размер обуви</Text>
            <Text>
              Пусть тебя не пугает этот вопрос, это нужно для того, чтобы мы
              могли отправить тебе подарок от нас, который подойдет по размеру
              :)
            </Text>
          </div>
          <TextInput
            size="l"
            {...register('size_shoe')}
            placeholder="Укажи размер обуви"
            error={Boolean(errors.size_shoe)}
            errorMessage={errors.size_shoe?.message}
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default OnboardingFormFull;
