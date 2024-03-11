import styles from './styles.module.css';
import { Button, Switch, Text, TextInput } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reportBotSchema } from '../../utils/validationSchema';
import { usePostReportBotMutation } from '../../store/amCrm/amCrm.api';
import { TEXTS } from '../../utils/constants';

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
      await postReportBotMutation(data);
      toaster.add({
        name: 'report-ok',
        title: TEXTS.REPORT_FORM.TOASTER_SUCCESS_TITLE,
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
        name: 'report-err',
        title: TEXTS.REPORT_FORM.TOASTER_ERROR_TITLE,
        content: TEXTS.REPORT_FORM.TOASTER_ERROR_CONTENT,
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

  return (
    <div className={styles.root}>
      <Text variant="subheader-3">{TEXTS.REPORT_FORM.HEADER}</Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Text>{TEXTS.REPORT_FORM.LAST_NAME}</Text>
          <div className={styles.nameSurname}>
            <TextInput
              size="l"
              {...register('last_name')}
              placeholder={TEXTS.REPORT_FORM.FIRST_NAME_PLACEHOLDER}
              error={Boolean(errors.last_name)}
              errorMessage={errors.last_name?.message}
            />
            <TextInput
              size="l"
              {...register('first_name')}
              placeholder={TEXTS.REPORT_FORM.LAST_NAME_PLACEHOLDER}
              error={Boolean(errors.first_name)}
              errorMessage={errors.first_name?.message}
            />
          </div>
        </div>

        <div>
          <Text>{TEXTS.REPORT_FORM.TELEGRAM_NICK}</Text>
          <TextInput
            size="l"
            {...register('telegram_id')}
            placeholder={TEXTS.REPORT_FORM.TELEGRAM_NICK_PLACEHOLDER}
            error={Boolean(errors.telegram_id)}
            errorMessage={errors.telegram_id?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.REPORT_FORM.CONTENT_LINK}</Text>
          <TextInput
            size="l"
            {...register('content_link_uri')}
            placeholder={TEXTS.REPORT_FORM.CONTENT_LINK_PLACEHOLDER}
            error={Boolean(errors.content_link_uri)}
            errorMessage={errors.content_link_uri?.message}
          />
        </div>

        <div>
          <Text>{TEXTS.REPORT_FORM.GUIDE_QUESTION}</Text>
          <Switch
            size="l"
            {...register('sign_junior')}
            title={TEXTS.REPORT_FORM.GUIDE_SWITCH_TITLE}
          />
        </div>

        <div>
          <Text>{TEXTS.REPORT_FORM.SCREENSHOT_LINK}</Text>
          <TextInput
            size="l"
            {...register('screen_uri')}
            placeholder={TEXTS.REPORT_FORM.SCREENSHOT_LINK_PLACEHOLDER}
            error={Boolean(errors.screen_uri)}
            errorMessage={errors.screen_uri?.message}
          />
        </div>

        <Button type="submit" view="action" width="auto">
          {TEXTS.REPORT_FORM.SUBMIT_BUTTON}
        </Button>
      </form>
    </div>
  );
};

export default ReportForm;
