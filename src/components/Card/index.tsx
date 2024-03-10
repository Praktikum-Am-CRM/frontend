import styles from './styles.module.css';
import { Button, Label, Link, Tabs, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import AmbassadorData from '../AmbassadorData';
import AmbassadorActivity from '../AmbassadorActivity';
import Merch from '../Merch';
import Chat from '../Chat';
import {
  useGetAmbassadorInfoQuery,
  usePatchDataAmbassadorMutation,
} from '../../store/amCrm/amCrm.api';
import { STATUSES } from '../../utils/constants';
import defineStatus from '../../utils/defineStatus';
import { AchieveType, AmbassadorDataType } from '../../types/types';

export default function Card({
  rowId,
  isAmbassador,
}: {
  rowId: string;
  isAmbassador?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>('tabs-data');
  const [isMerchDelivery, setIsMerchDelivery] = useState<boolean>(false);
  const [patchDataAmbassador] = usePatchDataAmbassadorMutation();

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
      return (
        ambassadorInfo && <AmbassadorActivity userId={ambassadorInfo.id} />
      );
    }
    if (id === 'tabs-merch') {
      return ambassadorInfo && <Merch userId={ambassadorInfo.id} />;
    }
    if (id === 'tabs-history') {
      return <Chat />;
    }
    return null;
  }

  function handleTabClick(id: string) {
    setActiveTab(id);
  }

  function renderAchives(ambassador: AmbassadorDataType) {
    return ambassador.achieves.map((achieve: AchieveType) => {
      return (
        <li className={styles.card__achieve} key={`li ${achieve.id}`}>
          <Label theme="success">{achieve.achieve_name}</Label>
        </li>
      );
    });
  }

  return (
    <>
      {ambassadorInfo && (
        <div className={styles.card}>
          <Text
            className={styles.card__heading}
            color="primary"
            variant="header-2"
          >
            {isMerchDelivery
              ? 'Отправка мерча'
              : `${ambassadorInfo.first_name} ${ambassadorInfo.last_name}`}
          </Text>
          {!isMerchDelivery && (
            <div className={styles.card__infoContainer}>
              <ul className={styles.card__infoList}>
                <li className={styles.card__infoPoint}>
                  <Text
                    className={styles.card__pointDescription}
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

                <li className={styles.card__infoPoint}>
                  <Text
                    className={styles.card__pointDescription}
                    color="secondary"
                  >
                    Статус
                  </Text>
                  <div className={styles.card__status}>
                    {ambassadorInfo.status &&
                      defineStatus(ambassadorInfo.status.id)}
                  </div>
                </li>

                {ambassadorInfo.status.id !== STATUSES.CANDIDATE ||
                  (STATUSES.ARCHIVE && (
                    <li
                      className={`${styles.card__infoPoint} ${styles.card__infoPoint_type_achievement}`}
                    >
                      <Text
                        className={styles.card__pointDescription}
                        color="secondary"
                      >
                        Ачивка
                      </Text>
                      <ul className={styles.card__achives}>
                        {renderAchives(ambassadorInfo)}
                      </ul>
                    </li>
                  ))}
                <li className={styles.card__infoPoint}>
                  <Text
                    className={styles.card__pointDescription}
                    color="secondary"
                  >
                    Направление
                  </Text>
                  <Text className={styles.card__course} color="primary">
                    {ambassadorInfo.programs[0].program_name}
                  </Text>
                </li>
              </ul>
              {isAmbassador ? (
                <Button
                  className={styles.card__assignButton}
                  onClick={() => setIsMerchDelivery(true)}
                >
                  Присвоить мерч
                </Button>
              ) : (
                <form
                  onSubmit={evt => {
                    evt.preventDefault();
                    patchDataAmbassador({
                      id: ambassadorInfo.id,
                      status: STATUSES.ACTIVE,
                    });
                  }}
                >
                  <Button className={styles.card__assignButton} type="submit">
                    Сделать амбассадором
                  </Button>
                </form>
              )}
            </div>
          )}
          {!isMerchDelivery && (
            <Tabs activeTab={activeTab} size="l" className={styles.card__tabs}>
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
