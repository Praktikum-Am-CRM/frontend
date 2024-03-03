import useMessages from '../../hooks/useMessages';
import MessagesList from '../MessagesList';

const Chats = () => {
  const messages = useMessages();

  return <MessagesList messages={messages.personalMessages} cardType="chats" />;
};

export default Chats;
