import styles from './styles.module.css';
import React from 'react';
import { Text, TextArea } from '@gravity-ui/uikit';
import { FAQ_DATA } from '../../utils/constants';

const FaqTab = () => {
  return (
    <div>
      <div className={styles.header}>
        <Text variant="subheader-3">Вопросы</Text>
        <Text variant="subheader-3">Ответы</Text>
      </div>
      <div className={styles.textArea}>
        {FAQ_DATA.map((faq, index) => (
          <React.Fragment key={index}>
            <TextArea value={faq.question}></TextArea>
            <TextArea value={faq.answer}></TextArea>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FaqTab;
