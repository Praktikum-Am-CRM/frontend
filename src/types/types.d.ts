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
}

export interface PersonalMessage {
  id: string;
  recipient: string;
  message: string;
  date: string;
}
