/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Button, Link, Text } from '@gravity-ui/uikit';

export default function AmbassadorCard({ rowData }: { rowData: any }) {
  return (
    <div className={styles.ambassadorCard}>
      <Text
        className={styles.ambassadorCard__heading}
        color="primary"
        variant="header-2"
      >
        {rowData.ambassador}
      </Text>
      <div className={styles.ambassadorCard__infoContainer}>
        <ul className={styles.ambassadorCard__infoList}>
          <li className={styles.ambassadorCard__infoPoint}>
            <Text
              className={styles.ambassadorCard__pointDescription}
              color="secondary"
            >
              Телеграм/whatsapp
            </Text>
            <Link view="normal" href={`https://t.me/${rowData.telegram}`}>
              {rowData.telegram}
            </Link>
          </li>
          <li className={styles.ambassadorCard__infoPoint}>
            <Text
              className={styles.ambassadorCard__pointDescription}
              color="secondary"
            >
              Статус
            </Text>
            <div className={styles.ambassadorCard__status}>
              {rowData.status}
            </div>
          </li>
          <li
            className={`${styles.ambassadorCard__infoPoint} ${styles.ambassadorCard__infoPoint_type_achievement}`}
          >
            <Text
              className={styles.ambassadorCard__pointDescription}
              color="secondary"
            >
              Ачивка
            </Text>
          </li>
          <li className={styles.ambassadorCard__infoPoint}>
            <Text
              className={styles.ambassadorCard__pointDescription}
              color="secondary"
            >
              Направление
            </Text>
            <Text className={styles.ambassadorCard__course} color="primary">
              {rowData.program}
            </Text>
          </li>
        </ul>
        <Button className={styles.ambassadorCard__assignMerchButton}>
          Присвоить мерч
        </Button>
      </div>
    </div>
  );
}
