import { useState } from 'react';
import styles from './styles.module.css';
import { Button, Tabs, TextArea } from '@gravity-ui/uikit';
import DelayedMessages from '../DelayedMessages';
import useMessages from '../../hooks/useMessages';

const Mailing = () => {
  const [activeTab, setActiveTab] = useState('newMailing');
  const [textAreaValue, setTextAreaValue] = useState('');
  const messages = useMessages();

  const handleTextAreaChange = event => {
    setTextAreaValue(event.target.value);
  };

  const handleSendClick = () => {
    console.log('Отправка текста:', textAreaValue);
  };

  const isButtonActive = () => {
    return textAreaValue.trim() === '';
  };

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
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />

        <div className={styles.actions}>
          <Button
            size="l"
            view="action"
            className={styles.actionButton}
            onClick={handleSendClick}
            disabled={isButtonActive()}
          >
            Отправить выбранным
          </Button>
          <Button
            size="l"
            className={styles.actionButton}
            disabled={isButtonActive()}
          >
            Отправить всем
          </Button>
          <Button
            size="l"
            className={styles.actionButton}
            disabled={isButtonActive()}
          >
            Отложить рассылку
          </Button>
          <Button
            size="l"
            className={styles.actionButton}
            disabled={isButtonActive()}
          >
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
        return <DelayedMessages messages={messages} />;
      case 'drafts':
        return <div>Тут будут черновики</div>;
      case 'history':
        return <div>Тут будет история</div>;
      default:
        return null;
    }
  };

  const countMessages = () => {
    return messages.bulkMessages.length + messages.personalMessages.length;
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
            title={`Отложенные (${countMessages()})`}
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
