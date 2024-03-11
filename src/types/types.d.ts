type TableRowData = {
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

interface ILoginForm {
  email: string;
  password: string;
}

type AmbassadorDataType = {
  id: string;
  telegram_bot: TelegramBotType;
  status: StatusType;
  manager: string;
  promocode: string;
  phone: string;
  receipt_date: string;
  registration: string;
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
  size_choe: number;
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

type AmbassadorDataPartial = Partial<AmbassadorDataType>;

type AmbassadorDataPartialWithoutStatus = Omit<AmbassadorDataPartial, 'status'>;

type AmbassadorDataPartialWithStringStatus =
  AmbassadorDataPartialWithoutStatus & {
    status?: string;
  };

type TelegramBotType = {
  id: string;
  telegram_id: string;
  nickname: string;
  registration_date: string;
  active: boolean;
};

type ProgramType = {
  id: string;
  program_name: string;
  available: boolean;
};

type GoalType = {
  id: string;
  goal_name: string;
  available: boolean;

  own_version?: string;
};

type ActivityType = {
  id: string;
  activity_name: string;
  available: boolean;
};

type StatusType = {
  id: string;
  status_name?: string;
  sort_level?: number;
  available?: boolean;
};

type MessageType = {
  id: string;
  type_name: string;
  available: boolean;
};

type MessageHistoryItemType = {
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

type NewMessageType = {
  message_text: string;
  ambassadors?: string[];
};

type AchieveType = {
  id: string;
  achieve_name: string;
  available: boolean;
};

interface DataResponseFromServer<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

type ReportQueryType = {
  ambassador?: AmbassadorsType;
  id: string;
  report_date: string;
  content_link: string;
  screen: string;
  placement: PlacementType;
  report_status: ReportStatusType;
  sign_junior: boolean;
  grade: number;
  report_type: ReportType;
};

type PlacementType = {
  id: string;
  site: string;
  available: boolean;
};

type ReportStatusType = {
  id: string;
  status_name: string;
  available: boolean;
};

type ReportType = {
  id: string;
  type_name: string;
  available: boolean;
};

type MerchRequestListType = {
  id: string;
  merch: MerchType;
  manager: ManagerType;
  request_status: RequestStatusType;
  delivery_address: DeliveryAddressType;
  ambassadors: AmbassadorsType;
};

type MerchType = {
  id: string;
  merch_name: string;
  price: string;
  intangible: boolean;
  available: boolean;
};

type ManagerType = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  username?: string;
};

type RequestStatusType = {
  id: string;
  status_name: string;
  available: boolean;
};

type DeliveryAddressType = {
  id: string;
  is_confirmed: boolean;
  index: string;
  region: string;
  district: string;
  settlement: string;
  street: string;
  house: string;
  building: string;
  country: string;
  apartment: string;
};

type TableColumnConfig = {
  id: string;
  name: string;
  width?: number;
  align?: 'left' | 'right' | 'center';
  meta?: {
    sort?: boolean;
  };
};

type MerchRequestType = {
  id: string;
  request_id: string;
  request_merch: MerchType;
  assignment_date: string;
  request_status: RequestStatusType;
  request_delivery_address: DeliveryAddressType;
};

type OnboardingMiniType = {
  last_name: string;
  first_name: string;
  gender: '0' | '1';
  telegram_id: string;
  programs: string[];
  email: string;
  phone_number: string;
  address_country: string;
  address_settlement: string;
  goals: string | null;
  own_version?: string;
  activity_id: (string | undefined)[];
  blog_link_uri: string;
  place_work: string;
  specialty_work: string;
  educational_institution: string;
  note?: string;
};

type ReportBotType = {
  last_name: string;
  first_name: string;
  telegram_id: string;
  content_link_uri: string;
  sign_junior?: boolean;
  screen_uri: string;
};

type AmbassadorStatusStatisticType = {
  id: string;
  status_name: string;
  sort_level: number;
  available: boolean;
  count: number;
};

type AmbassadorProgramStatisticType = {
  id: string;
  program_name: string;
  available: boolean;
  count: number;
};
