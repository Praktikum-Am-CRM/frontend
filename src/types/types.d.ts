export type TableRowData = {
  id: string;
  ambassador: string;
  tel?: string;
  status?: string;
  promo?: string;
  telegram: string;
  email?: string;
  registration: string;
  gender: string;
  program: string;
  address?: string;
};

export interface MessagesState {
  bulkMessages: BulkMessage[];
  personalMessages: PersonalMessage[];
}

export interface BulkMessage {
  id: string;
  recipients: string;
  message: string;
  date: string;
  pinned?: boolean;
}

export interface PersonalMessage {
  id: string;
  recipient: string;
  message: string;
  date: string;
  pinned?: boolean;
}

export type Message = BulkMessage | PersonalMessage;

export type CardType = 'delayed' | 'chats';

export type MessageType = {
  id: string;
  type_name: string;
  available: boolean;
};

export type ManagerType = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
};

export type MessageHistoryItemType = {
  id: string;
  message: {
    id: string;
    message_text: string;
    media_link: string;
    date: string;
    message_type: MessageType;
  };
  from_bot: boolean;
  manager: ManagerType;
  sign_ai: boolean;
  message_telegram_id: string;
  reaction: number | null;
};
