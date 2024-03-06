export type TableRowData = {
  id: number;
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

export type FilterType = {
  id: string;
};

export type StatusType = FilterType & {
  status_name: string;
};

export type ProgramType = FilterType & {
  program_name: string;
};
