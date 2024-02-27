import styles from './styles.module.css';

import { Link } from '@gravity-ui/uikit';

export default function AmbassadorCard({ rowData }) {
  return (
    <div className={styles.ambassadorCard}>
      <h2 className={styles.ambassadorCard__heading}>{rowData.ambassador}</h2>
      <div className={styles.ambassadorCard__infoContainer}>
        <ul className={styles.ambassadorCard__infoList}>
          <li className={styles.ambassadorCard__infoPoint}>
            <p className={styles.ambassadorCard__pointDescription}>
              Телеграм/whatsapp
            </p>
            <Link view="normal" href={`https://t.me/${rowData.telegram}`}>
              @{rowData.telegram}
            </Link>
          </li>
          <li className={styles.ambassadorCard__infoPoint}>
            <p className={styles.ambassadorCard__pointDescription}>Статус</p>
            <div>{rowData.status}</div>
          </li>
          <li
            className={`${styles.ambassadorCard__infoPoint} ${styles.ambassadorCard__infoPoint_type_achievement}`}
          >
            <p className={styles.ambassadorCard__pointDescription}>Ачивка</p>
          </li>
          <li className={styles.ambassadorCard__infoPoint}>
            <p className={styles.ambassadorCard__pointDescription}>
              Направление
            </p>
            <p className={styles.ambassadorCard__course}>{rowData.program}</p>
          </li>
        </ul>
        <button className={styles.ambassadorCard__assignMerchButton}>
          Присвоить мерч
        </button>
      </div>
    </div>
  );
}
