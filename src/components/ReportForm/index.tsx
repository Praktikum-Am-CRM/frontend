import styles from './styles.module.css';
import { Button, Switch, Text, TextInput } from '@gravity-ui/uikit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reportBotSchema } from '../../utils/validationSchema';
import { usePostReportBotMutation } from '../../store/amCrm/amCrm.api';
import { ReportBotType } from '../../types/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram: any;
  }
}
const ReportForm = () => {
  const tg = window.Telegram.WebApp;
  const [postReportBotMutation] = usePostReportBotMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reportBotSchema),
  });

  const onSubmit = async (data: ReportBotType) => {
    try {
      const response = await postReportBotMutation(data).unwrap();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }

    if (tg) {
      tg.sendData(JSON.stringify(data));
      tg.close();
    }
  };

  return (
    <div className={styles.root}>
      <Text variant="subheader-3">Мой амбассадорский контент</Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Text>Фамилия, имя</Text>
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
          <Text>Твой ник в телеграм</Text>
          <TextInput
            size="l"
            {...register('telegram_id')}
            placeholder="Ник в телеграм"
            error={Boolean(errors.telegram_id)}
            errorMessage={errors.telegram_id?.message}
          />
        </div>

        <div>
          <Text>Ссылка на контент</Text>
          <TextInput
            size="l"
            {...register('content_link_uri')}
            placeholder="Ссылка на контент"
            error={Boolean(errors.content_link_uri)}
            errorMessage={errors.content_link_uri?.message}
          />
        </div>

        <div>
          <Text>Это контент в рамках Гайда начинающего амбассадора?</Text>
          <Switch
            size="l"
            {...register('sign_junior')}
            title="Укажите, относится ли контент к Гайду начинающего амбассадора"
          />
        </div>

        <div>
          <Text>Поле для ссылки на скриншот/скринкаст</Text>
          <TextInput
            size="l"
            {...register('screen_uri')}
            placeholder="Ссылка на скриншот/скринкаст"
            error={Boolean(errors.screen_uri)}
            errorMessage={errors.screen_uri?.message}
          />
        </div>

        <Button type="submit" view="action" width="auto">
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default ReportForm;
