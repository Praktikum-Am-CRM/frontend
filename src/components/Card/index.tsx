import styles from './styles.module.css';
import {
  ArrowToggle,
  Button,
  DropdownMenu,
  Label,
  Link,
  Tabs,
  Text,
  useToaster,
} from '@gravity-ui/uikit';
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

export default function Card({ rowId }: { rowId: string }) {
  const [activeTab, setActiveTab] = useState<string>('tabs-data');
  const [isMerchDelivery, setIsMerchDelivery] = useState<boolean>(false);
  const [patchDataAmbassador] = usePatchDataAmbassadorMutation();
  const { add } = useToaster();
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

  const handleStatusPatchToaster = (bool: boolean) =>
    bool
      ? add({
          name: 'status',
          title: 'Статус изменен',
          theme: 'success',
          autoHiding: 5000,
        })
      : add({
          name: 'status',
          title: 'Статус не изменен',
          theme: 'danger',
          autoHiding: 5000,
        });

  const handleStatusChange = (status: string, id: string) => ({
    action: () => {
      patchDataAmbassador({
        id,
        status,
      })
        .unwrap()
        .then(() => {
          handleStatusPatchToaster(true);
        })
        .catch(() => {
          handleStatusPatchToaster(false);
        });
    },

    text: status && defineStatus(status),
  });

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
                {ambassadorInfo.status.id !== STATUSES.CANDIDATE &&
                  ambassadorInfo.status.id !== STATUSES.ARCHIVE && (
                    <li
                      className={`${styles.card__infoPoint} ${styles.card__infoPoint_type_status}`}
                    >
                      <Text
                        className={styles.card__pointDescription}
                        color="secondary"
                      >
                        Статус
                      </Text>

                      <DropdownMenu
                        size="xl"
                        renderSwitcher={props => (
                          <div className={styles.card__status} {...props}>
                            {ambassadorInfo.status &&
                              defineStatus(ambassadorInfo.status.id)}
                            <ArrowToggle />
                          </div>
                        )}
                        items={[
                          handleStatusChange(
                            STATUSES.DELETED,
                            ambassadorInfo.id,
                          ),
                          handleStatusChange(
                            STATUSES.ACTIVE,
                            ambassadorInfo.id,
                          ),
                          handleStatusChange(STATUSES.PAUSE, ambassadorInfo.id),
                          handleStatusChange(
                            STATUSES.PENDING,
                            ambassadorInfo.id,
                          ),
                        ]}
                      />
                    </li>
                  )}
                {ambassadorInfo.status.id !== STATUSES.CANDIDATE &&
                  ambassadorInfo.status.id !== STATUSES.ARCHIVE && (
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
                  )}
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
              {ambassadorInfo.status.id !== STATUSES.CANDIDATE &&
              ambassadorInfo.status.id !== STATUSES.ARCHIVE ? (
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
                    })
                      .unwrap()
                      .then(() => handleStatusPatchToaster(true))
                      .catch(() => handleStatusPatchToaster(false));
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
              {ambassadorInfo.status.id !== STATUSES.CANDIDATE &&
                ambassadorInfo.status.id !== STATUSES.ARCHIVE && (
                  <Tabs.Item
                    id="tabs-activity"
                    title="Деятельность"
                    onClick={id => {
                      handleTabClick(id);
                    }}
                  ></Tabs.Item>
                )}
              {ambassadorInfo.status.id !== STATUSES.CANDIDATE &&
                ambassadorInfo.status.id !== STATUSES.ARCHIVE && (
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
