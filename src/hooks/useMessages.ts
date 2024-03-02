import { useEffect, useState } from 'react';
import { MessagesState } from '../types/types';
import { mockDelayedMessages } from '../utils/mockData';

const useMessages = () => {
  const [messages, setMessages] = useState<MessagesState>({
    bulkMessages: [],
    personalMessages: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setMessages(mockDelayedMessages as MessagesState);
    }, 100);
  }, []);

  return messages;
};

export default useMessages;
