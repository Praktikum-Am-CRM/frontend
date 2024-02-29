/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Button, Link, Tabs, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import AmbassadorData from '../AmbassadorData';
import AmbassadorActivity from '../AmbassadorActivity';
import AmbassadorMerch from '../AmbassadorMerch';
import AmbassadorHistory from '../AmbassadorHistory';
import determineStatus from '../../utils/DetermineStatus';
import { ambassadorArray } from '../../utils/mockData';

// eslint-disable-next-line no-console
export default function AmbassadorCard({
  rowData,
  isAmbassador,
}: {
  rowData: string;
  isAmbassador: boolean;
}) {
  const [isTabsDataActive, setIsTabsDataActive] = useState<boolean>(true);
  const [isTabsActivityActive, setIsTabsActivityActive] =
    useState<boolean>(false);
  const [isTabsMerchActive, setIsTabsMerchActive] = useState<boolean>(false);
  const [isTabsHistoryActive, setIsTabsHistoryActive] =
    useState<boolean>(false);

  function findUserById(id) {
    if (isAmbassador) {
      return ambassadorArray.find(ambassador => ambassador.id === id);
    } else {
      return ambassadorArray.find(candidate => candidate.id === id);
    }
  }
  const user = findUserById(rowData);

  function determineContent() {
    if (isTabsDataActive) {
      return <AmbassadorData user={user} />;
    }
    if (isTabsActivityActive) {
      return <AmbassadorActivity user={user} />;
    }
    if (isTabsMerchActive) {
      return <AmbassadorMerch user={user} />;
    }
    if (isTabsHistoryActive) {
      return <AmbassadorHistory user={user} />;
    }
    return null;
  }

  return (
    <div className={styles.ambassadorCard}>
      <Text
        className={styles.ambassadorCard__heading}
        color="primary"
        variant="header-2"
      >
        {user.ambassador}
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
            <Link view="normal" href={`https://t.me/${user.telegram}`}>
              {user.telegram}
            </Link>
          </li>
          {user.Status !== 'candidate' && (
            <li className={styles.ambassadorCard__infoPoint}>
              <Text
                className={styles.ambassadorCard__pointDescription}
                color="secondary"
              >
                Статус
              </Text>
              <div className={styles.ambassadorCard__status}>
                {user.Status && determineStatus(user.Status)}
              </div>
            </li>
          )}
          {user.Status !== 'candidate' && (
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
          )}
          <li className={styles.ambassadorCard__infoPoint}>
            <Text
              className={styles.ambassadorCard__pointDescription}
              color="secondary"
            >
              Направление
            </Text>
            <Text className={styles.ambassadorCard__course} color="primary">
              {user.program}
            </Text>
          </li>
        </ul>
        {isAmbassador ? (
          <Button className={styles.ambassadorCard__assignButton}>
            Присвоить мерч
          </Button>
        ) : (
          <Button
            className={styles.ambassadorCard__assignButton}
            onClick={() => {
              user.Status = 'active';
            }}
          >
            Сделать амбассадором
          </Button>
        )}
      </div>
      <Tabs size="l" className={styles.ambassadorCard__tabs}>
        <Tabs.Item
          id="tabs-data"
          title="Данные"
          active={isTabsDataActive}
          onClick={() => {
            setIsTabsDataActive(true);
            setIsTabsActivityActive(false);
            setIsTabsMerchActive(false);
            setIsTabsHistoryActive(false);
          }}
        ></Tabs.Item>
        {isAmbassador && (
          <Tabs.Item
            id="tabs-activity"
            title="Деятельность"
            active={isTabsActivityActive}
            onClick={() => {
              setIsTabsDataActive(false);
              setIsTabsActivityActive(true);
              setIsTabsMerchActive(false);
              setIsTabsHistoryActive(false);
            }}
          ></Tabs.Item>
        )}
        {isAmbassador && (
          <Tabs.Item
            id="tabs-merch"
            title="Мерч"
            active={isTabsMerchActive}
            onClick={() => {
              setIsTabsDataActive(false);
              setIsTabsActivityActive(false);
              setIsTabsMerchActive(true);
              setIsTabsHistoryActive(false);
            }}
          ></Tabs.Item>
        )}
        <Tabs.Item
          id="tabs-history"
          title="История"
          active={isTabsHistoryActive}
          onClick={() => {
            setIsTabsDataActive(false);
            setIsTabsActivityActive(false);
            setIsTabsMerchActive(false);
            setIsTabsHistoryActive(true);
          }}
        ></Tabs.Item>
      </Tabs>
      <div className={styles.ambassadorCard__content}>{determineContent()}</div>
    </div>
  );
}
