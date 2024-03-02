import { useState } from 'react';
import styles from './styles.module.css';
import { Button, Tabs, TextArea } from '@gravity-ui/uikit';
import DelayedMessages from '../DelayedMessages';

const Mailing = () => {
  const [activeTab, setActiveTab] = useState('newMailing');

  const newMailing = () => {
    return (
      <>
        <Button className={styles.templatesButton} size="l">
          Шаблоны
        </Button>
        <TextArea
          placeholder="Начните новую рассылку"
          size="l"
          className={styles.textArea}
        />

        <div className={styles.actions}>
          <Button size="l" view="action" className={styles.actionButton}>
            Отправить выбранным
          </Button>
          <Button size="l" className={styles.actionButton}>
            Отправить всем
          </Button>
          <Button size="l" className={styles.actionButton}>
            Отложить рассылку
          </Button>
          <Button size="l" className={styles.actionButton}>
            В черновики
          </Button>
        </div>
      </>
    );
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'newMailing':
        return <div>{newMailing()}</div>;
      case 'delayed':
        return <DelayedMessages />;
      case 'drafts':
        return <div>Тут будут черновики</div>;
      case 'history':
        return <div>Тут будет история</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mailListContainer}>
      <Tabs size="l" className={styles.tabs}>
        <Tabs.Item
          id="tabs-newMailing"
          title={'Новая рассылка'}
          active={activeTab === 'newMailing'}
          onClick={() => setActiveTab('newMailing')}
        ></Tabs.Item>
        {
          <Tabs.Item
            id="tabs-delayed"
            title="Отложенные"
            active={activeTab === 'delayed'}
            onClick={() => setActiveTab('delayed')}
          ></Tabs.Item>
        }
        {
          <Tabs.Item
            id="tabs-drafts"
            title="Черновики"
            active={activeTab === 'drafts'}
            onClick={() => setActiveTab('drafts')}
          ></Tabs.Item>
        }
        {
          <Tabs.Item
            id="tabs-history"
            title="История"
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          ></Tabs.Item>
        }
      </Tabs>

      <div className={styles.tabContent}>
        <TabContent />
      </div>
    </div>
  );
};

export default Mailing;
