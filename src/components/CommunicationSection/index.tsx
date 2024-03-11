import styles from './styles.module.css';
import { useState } from 'react';
import Mailing from '../Mailing';
import FaqTab from '../FaqTab';
import { RadioButton, Text } from '@gravity-ui/uikit';

const CommunicationSection = () => {
  const [activeTab, setActiveTab] = useState('mailing');

  const options = [
    { value: 'mailing', content: <Text variant="header-1">Рассылка</Text> },
    { value: 'faq', content: <Text variant="header-1">FAQ</Text> },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'mailing':
        return (
          <div>
            <Mailing />
          </div>
        );
      case 'faq':
        return <FaqTab />;
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
