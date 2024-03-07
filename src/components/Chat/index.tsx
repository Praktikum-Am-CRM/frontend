import styles from './styles.module.css';
import CommunicationHistory from '../CommunicationHistory';
import PersonalMessage from '../PersonalMessage';

const Chat = () => {
  return (
    <div className={styles.root}>
      <CommunicationHistory />
      <PersonalMessage />
    </div>
  );
};

export default Chat;
