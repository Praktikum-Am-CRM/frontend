import styles from './styles.module.css';
import { useState } from 'react';
import Mailing from '../Mailing';
import { RadioButton, Text } from '@gravity-ui/uikit';

const CommunicationSection = () => {
  const [activeTab, setActiveTab] = useState('mailing');

  const options = [
    { value: 'mailing', content: <Text variant="display-1">Рассылка</Text> },
    { value: 'chats', content: <Text variant="display-1">Чаты</Text> },
    { value: 'faq', content: <Text variant="display-1">FAQ</Text> },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'mailing':
        return (
          <div>
            <Mailing />
          </div>
        );
      case 'chats':
        return <div>тут чаты</div>;
      case 'faq':
        return <div>Тут фак</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.root}>
      <RadioButton
        className={styles.radioButtons}
        size="xl"
        name="group1"
        defaultValue={options[0].value}
        options={options}
        onChange={event => setActiveTab(event.target.value)}
      />
      <div className={styles.tabContent}>
        <TabContent />
      </div>
    </div>
  );
};

export default CommunicationSection;
