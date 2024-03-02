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
  rowData: string | undefined;
  isAmbassador?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>('tabs-data');

  function findUserById(id: string) {
    return ambassadorArray.find(candidate => candidate.id === id);
  }
  const user = findUserById(rowData);

  function determineContent(id: string) {
    if (id === 'tabs-data') {
      return <AmbassadorData user={user} />;
    }
    if (id === 'tabs-activity') {
      return <AmbassadorActivity user={user} />;
    }
    if (id === 'tabs-merch') {
      return <AmbassadorMerch user={user} />;
    }
    if (id === 'tabs-history') {
      return <AmbassadorHistory user={user} />;
    }
    return null;
  }

  function handleTabClick(id: string) {
    setActiveTab(id);
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
              @{user.telegram}
            </Link>
          </li>
          {user.status !== 'candidate' && (
            <li className={styles.ambassadorCard__infoPoint}>
              <Text
                className={styles.ambassadorCard__pointDescription}
                color="secondary"
              >
                Статус
              </Text>
              <div className={styles.ambassadorCard__status}>
                {user.status && determineStatus(user.status)}
              </div>
            </li>
          )}
          {user.status !== 'candidate' && (
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
              user.status = 'active';
            }}
          >
            Сделать амбассадором
          </Button>
        )}
      </div>
      <Tabs
        activeTab={activeTab}
        size="l"
        className={styles.ambassadorCard__tabs}
      >
        <Tabs.Item
          id="tabs-data"
          title="Данные"
          onClick={id => {
            handleTabClick(id);
          }}
        ></Tabs.Item>
        {isAmbassador && (
          <Tabs.Item
            id="tabs-activity"
            title="Деятельность"
            onClick={id => {
              handleTabClick(id);
            }}
          ></Tabs.Item>
        )}
        {isAmbassador && (
          <Tabs.Item
            id="tabs-merch"
            title="Мерч"
            onClick={id => {
              handleTabClick(id);
            }}
          ></Tabs.Item>
        )}
        <Tabs.Item
          id="tabs-history"
          title="История"
          onClick={id => {
            handleTabClick(id);
          }}
        ></Tabs.Item>
      </Tabs>
      {determineContent(activeTab)}
    </div>
  );
}
