import styles from './styles.module.css';
import CommunicationHistory from '../CommunicationHistory';
import PersonalMessage from '../PersonalMessage';
import { Spin } from '@gravity-ui/uikit';
import { useGetAmbassadorMessagesQuery } from '../../store/amCrm/amCrm.api';
import { useAppSelector } from '../../hooks/redux';

const Chat = () => {
  const pickedRowUserId = useAppSelector(state => state.table.pickedRowUserId);

  const { data: messageHistoryAmbassadorId, isFetching } =
    useGetAmbassadorMessagesQuery({
      id: pickedRowUserId,
    });
  return isFetching ? (
    <Spin className={styles.spin} size="xl" />
  ) : (
    messageHistoryAmbassadorId && (
      <div className={styles.root}>
        <CommunicationHistory messages={messageHistoryAmbassadorId} />
        <PersonalMessage />
      </div>
    )
  );
};

export default Chat;
