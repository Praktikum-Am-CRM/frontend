import styles from './styles.module.css';
import { ReactElement, useState } from 'react';
import { Tabs } from '@gravity-ui/uikit';
import DelayedMessages from '../DelayedMessages';
import useMessages from '../../hooks/useMessages';
import NewMailing from '../NewMailing';

type TabId = 'newMailing' | 'delayed' | 'drafts' | 'history';

const Mailing = () => {
  const [activeTab, setActiveTab] = useState<TabId>('newMailing');
  const messages = useMessages();

  const tabsContent: Record<TabId, ReactElement> = {
    newMailing: <NewMailing />,
    delayed: <DelayedMessages messages={messages} />,
    drafts: <div>Тут будут черновики</div>,
    history: <div>Тут будет история</div>,
  };

  const countMessages = () =>
    messages.bulkMessages.length + messages.personalMessages.length;

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
