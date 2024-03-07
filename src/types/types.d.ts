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

export type AmbassadorDataType = {
  id: string;
  telegram_bot: TelegramBot;
  status: string;
  manager: string;
  promocode: string;
  receipt_date: string;
  reminder_counter: number;
  address_country: string;
  address_index: string;
  address_region?: string;
  address_district: string;
  address_settlement: string;
  address_street: string;
  address_house: number;
  address_building?: string;
  address_apartment?: string;
  size_clothing: string;
  email: string;
  note: string;
  blog_link: string;
  place_work: string;
  specialty_work: string;
  educational_institution: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  birthday: string;
  programs: Program[];
  goals: Goal[];
  activity: Activity[];
  achieves: AchieveType[];
};

export type TelegramBotType = {
  id: string;
  telegram_id: string;
  nickname: string;
  registration_date: string;
  active: boolean;
};

export type ProgramType = {
  id: string;
  program_name: string;
  available: boolean;
};

export type GoalType = {
  id: string;
  goal_name: string;
  available: boolean;
};

export type ActivityType = {
  id: string;
  activity_name: string;
  available: boolean;
};

export type StatusType = {
  id: string;
  status_name: string;
};

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

export type AmbassadorInfoType = {
  id: string;
  telegram_bot: TelegramBot;
  status: string;
  manager: string;
  promocode: string;
  receipt_date: string;
  reminder_counter: number;
  address_country: string;
  address_index: string;
  address_region: string;
  address_district: string;
  address_settlement: string;
  address_street: string;
  address_house: number;
  address_building: string;
  address_apartment: string;
  size_clothing: string;
  email: string;
  note: string;
  blog_link: string;
  place_work: string;
  specialty_work: string;
  educational_institution: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  birthday: string;
  programs: ProgramType[];
  goals: GoalType[];
  activity: ActivityType[];
  achieves: AchieveType[];
};

export type AchieveType = {
  id: string;
  achieve_name: string;
  available: boolean;
};

export interface AmbassadorDataResponse {
  count: number;
  next: string;
  previous: string;
  results: AmbassadorDataType[];
}
