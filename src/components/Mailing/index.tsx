import styles from './styles.module.css';
import { ReactElement } from 'react';
import { Tabs } from '@gravity-ui/uikit';
import DelayedMessages from '../DelayedMessages';
import useMessages from '../../hooks/useMessages';
import NewMailing from '../NewMailing';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

type TabId = 'newMailing' | 'delayed' | 'drafts' | 'history';

const Mailing = () => {
  const activeTab = useAppSelector(state => state.mailing.activeTab);
  const { setActiveTab } = useActions();

  const { messagesDelayed } = useMessages();

  const tabsContent: Record<TabId, ReactElement> = {
    newMailing: <NewMailing />,
    delayed: <DelayedMessages messages={messagesDelayed} />,
    drafts: <div>Тут будут черновики</div>,
    history: <div>Тут будет история</div>,
  };

  const countMessages = () =>
    messagesDelayed.bulkMessages.length +
    messagesDelayed.personalMessages.length;

  const handleTabClick = (tabId: TabId) => setActiveTab(tabId);

  return (
    <div className={styles.mailListContainer}>
      <Tabs size="l" className={styles.tabs}>
        <Tabs.Item
          id="tabs-newMailing"
          title="Новая рассылка"
          active={activeTab === 'newMailing'}
          onClick={() => handleTabClick('newMailing')}
        />
        <Tabs.Item
          id="tabs-delayed"
          title={`Отложенные (${countMessages()})`}
          active={activeTab === 'delayed'}
          onClick={() => handleTabClick('delayed')}
        />
        <Tabs.Item
          id="tabs-drafts"
          title="Черновики"
          active={activeTab === 'drafts'}
          onClick={() => handleTabClick('drafts')}
        />
        <Tabs.Item
          id="tabs-history"
          title="История"
          active={activeTab === 'history'}
          onClick={() => handleTabClick('history')}
        />
      </Tabs>

      <div className={styles.tabContent}>{tabsContent[activeTab]}</div>
    </div>
  );
};

export default Mailing;
