import styles from './styles.module.css';
import { ReactElement } from 'react';
import { Tabs } from '@gravity-ui/uikit';
import NewMailing from '../NewMailing';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

type TabId = 'newMailing';

const Mailing = () => {
  const activeTab = useAppSelector(state => state.mailing.activeTab);
  const { setActiveTab } = useActions();

  const tabsContent: Record<TabId, ReactElement> = {
    newMailing: <NewMailing />,
  };

  const handleTabClick = (tabId: TabId) => setActiveTab(tabId);

  return (
    <div>
      <Tabs size="l" className={styles.tabs}>
        <Tabs.Item
          id="tabs-newMailing"
          title="Новая рассылка"
          active={activeTab === 'newMailing'}
          onClick={() => handleTabClick('newMailing')}
        />
      </Tabs>

      <div className={styles.tabContent}>{tabsContent[activeTab as TabId]}</div>
    </div>
  );
};

export default Mailing;
