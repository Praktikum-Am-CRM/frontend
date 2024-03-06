/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Button, Link, Tabs, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import AmbassadorData from '../AmbassadorData';
import AmbassadorActivity from '../AmbassadorActivity';
import AmbassadorMerch from '../AmbassadorMerch';
import CommunicationHistory from '../CommunicationHistory';
import { useGetAmbassadorInfoQuery } from '../../store/amCrm/amCrm.api';
import defineStatus from '../../utils/defineStatus';

// eslint-disable-next-line no-console
export default function AmbassadorCard({
  rowId,
  isAmbassador,
  setIsMerchDelivery,
  isMerchDelivery,
}: {
  rowId: string;
  isAmbassador?: boolean;
  setIsMerchDelivery: (value: boolean) => void;
  isMerchDelivery: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>('tabs-data');

  const { data: ambassadorInfo } = useGetAmbassadorInfoQuery({ id: rowId });

  function determineContent(id: string) {
    if (id === 'tabs-data') {
      return (
        <>
          {ambassadorInfo && (
            <AmbassadorData
              user={ambassadorInfo}
              isMerchDelivery={isMerchDelivery}
            />
          )}
        </>
      );
    }
    if (id === 'tabs-activity') {
      return <AmbassadorActivity user={ambassadorInfo} />;
    }
    if (id === 'tabs-merch') {
      return <AmbassadorMerch user={ambassadorInfo} />;
    }
    if (id === 'tabs-history') {
      return <CommunicationHistory />;
    }
    return null;
  }

  function handleTabClick(id: string) {
    setActiveTab(id);
  }

  return (
    <>
      {ambassadorInfo && (
        <div className={styles.ambassadorCard}>
          <Text
            className={styles.ambassadorCard__heading}
            color="primary"
            variant="header-2"
          >
            {isMerchDelivery ? 'Отправка мерча' : ambassadorInfo.first_name}
          </Text>
          {!isMerchDelivery && (
            <div className={styles.ambassadorCard__infoContainer}>
              <ul className={styles.ambassadorCard__infoList}>
                <li className={styles.ambassadorCard__infoPoint}>
                  <Text
                    className={styles.ambassadorCard__pointDescription}
                    color="secondary"
                  >
                    Телеграм/whatsapp
                  </Text>
                  <Link
                    view="normal"
                    href={`https://t.me/${ambassadorInfo.telegram_bot.nickname}`}
                  >
                    @{ambassadorInfo.telegram_bot.nickname}
                  </Link>
                </li>
                {ambassadorInfo.status !== 'candidate' && (
                  <li className={styles.ambassadorCard__infoPoint}>
                    <Text
                      className={styles.ambassadorCard__pointDescription}
                      color="secondary"
                    >
                      Статус
                    </Text>
                    <div className={styles.ambassadorCard__status}>
                      {ambassadorInfo.status &&
                        defineStatus(ambassadorInfo.status)}
                    </div>
                  </li>
                )}
                {ambassadorInfo.status !== 'candidate' && (
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
                  <Text
                    className={styles.ambassadorCard__course}
                    color="primary"
                  >
                    {ambassadorInfo.programs[0].program_name}
                  </Text>
                </li>
              </ul>
              {isAmbassador ? (
                <Button
                  className={styles.ambassadorCard__assignButton}
                  onClick={() => setIsMerchDelivery(true)}
                >
                  Присвоить мерч
                </Button>
              ) : (
                <Button
                  className={styles.ambassadorCard__assignButton}
                  onClick={() => {
                    ambassadorInfo.status = 'active';
                  }}
                >
                  Сделать амбассадором
                </Button>
              )}
            </div>
          )}
          {!isMerchDelivery && (
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
          )}
          {isMerchDelivery
            ? determineContent('tabs-data')
            : determineContent(activeTab)}
        </div>
      )}
    </>
  );
}
