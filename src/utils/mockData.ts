export const ambassadorArray = [
  {
    id: '1',
    ambassador:
      'Константин Константинопольский Константинопольский Константинопольский Константинопольский',
    status: 'active',
    promo: '444',
    telegram: 'alter',
    program: 'Фронт',
    date_receipt: '01.02.2022',
    gender: 'woman',
    address: 'Москва, ул. Пушкина, д. 17',
    activity: 'Вести блог',
    e_mail: '12345@ya.ru',
  },

  {
    id: '2',
    ambassador: 'Амбассадор',
    status: 'active',
    promo: '44334',
    telegram: 'front',
    program: 'Фронт',
    date_receipt: '02.02.2022',
    gender: 'man',
    address:
      'РФ, Новосибирская область, Бердск, Территория, изъятая из земель подсобного хозяйства Всесоюзного центрального совета профессиональных союзов для организации крестьянского хозяйства, дом 17',
  },

  {
    id: '3',
    ambassador: 'Амба22ссадор',
    status: 'pending',
    promo: '444',
    telegram: 'moskow',
    program: 'Фронт',
    date_receipt: '03.02.2022',
    gender: 'man',
    address: 'Москва, ул. Пушкина, д. 17',
  },
  {
    id: '4',
    ambassador: 'Амбассадор',
    status: 'candidate',
    tel: '343234234',
    promo: '444',
    telegram: 'moskow',
    email: 'test@test',
    date_receipt: '01.02.2022',
    gender: 'woman',
    program: 'Фронт',
  },
  {
    id: '5',
    ambassador: 'Амбассадор',
    status: 'pending',
    tel: '343234234',
    promo: '444',
    telegram: 'mosk888ow',
    email: 'test@test',
    date_receipt: '02.02.2022',
    gender: 'man',
    program: 'Бэк',
  },

  {
    id: '6',
    ambassador: 'Амбассадор',
    status: 'candidate',
    tel: '343234234',
    promo: '444',
    telegram: 'mos4444kow',
    email: 'test@test',
    date_receipt: '03.02.2022',
    gender: 'man',
    program: 'Бэк',
  },
  {
    id: '7',
    ambassador: 'Архив Амбассадор',
    status: 'deleted',
    tel: '343234234',
    promo: '444',
    telegram: 'moskow',
    email: 'test@test',
    date_receipt: '01.02.2022',
    gender: 'woman',
    program: 'Фронт',
  },
  {
    id: '8',
    ambassador: 'Амбассадор',
    status: 'deleted',
    tel: '343234234',
    promo: '444',
    telegram: 'mosk888ow',
    email: 'test@test',
    date_receipt: '02.02.2022',
    gender: 'man',
    program: 'Бэк',
  },
];

export const mockDelayedMessages = {
  bulkMessages: [
    {
      id: '1',
      recipients: 'Все амбассадоры',
      message: 'Амбассадоры, здравствуйте! Это пример рассылки.',
      date: '2023-11-16T09:22:20.000Z',
    },
    {
      id: '2',
      recipients: 'Фёдор Достоевский, Николай Гоголь',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      date: '2022-09-26T23:12:33.000Z',
    },
  ],
  personalMessages: [
    {
      id: '1',
      recipient: 'Иван Иванов',
      message: 'Иван, здравствуйте! Это пример рассылки.',
      date: '2022-10-29T00:09:20.000Z',
    },
    {
      id: '2',
      recipient: 'Анастасия Гусева',
      message: 'Анастасия, здравствуйте! Это пример рассылки.',
      date: '2022-12-04T16:16:17.000Z',
    },
    {
      id: '3',
      recipient: 'Гена Букин',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.',
      date: '2022-09-06T05:09:53.000Z',
    },
    {
      id: '4',
      recipient: 'Ольга Сергеевна',
      message:
        'Предупреждение: Ваши носки устроили побег из ящика. Они последний раз были замечены на вечеринке с другими одиночными носками. Возможно, они пытаются найти свои пары.',
      date: '2023-09-30T15:08:30.000Z',
    },
  ],
};
