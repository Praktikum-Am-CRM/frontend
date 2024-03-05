import MessagesList from '../MessagesList';
import { useState } from 'react';
import CommunicationHistory from '../CommunicationHistory';
import { mockChatsMessages } from '../../utils/mockData';

const Chats = () => {
  const [historyIsOpen, setHistoryIsOpen] = useState(false);

  const handleClickChat = () => {
    setHistoryIsOpen(true);
  };

  const handleClickBack = () => {
    setHistoryIsOpen(false);
  };

  function defineContent() {
    if (historyIsOpen) {
      return <CommunicationHistory onClick={handleClickBack} />;
    } else {
      return (
        <MessagesList
          messages={mockChatsMessages}
          cardType="chats"
          onClick={handleClickChat}
        />
      );
    }
  }

  return defineContent();
};

export default Chats;
