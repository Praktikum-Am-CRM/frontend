import { useEffect, useState } from 'react';
import { MessagesState } from '../types/types';
import { mockDelayedMessages } from '../utils/mockData';

const useMessages = () => {
  const [messagesDelayed, setMessages] = useState<MessagesState>({
    bulkMessages: [],
    personalMessages: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setMessages(mockDelayedMessages as MessagesState);
    }, 100);
  }, []);

  return { messagesDelayed };
};

export default useMessages;
