import {
  Table,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from '@gravity-ui/uikit';
import { useState } from 'react';

const MyTable = withTableSelection(withTableSorting(withTableSettings(Table)));

const data = [
  {
    id: 1,
    ambassador: 'Амбассадор',
    status: 'Статус',
    comments: 'Комментарии',
    promo: '444',
    telegram: '"34  "',
    program: 'Фронт',
    registration: '02.02.2022',
    gender: 'М',
    address: 'Москва, ул. Пушкина, д. 17',
  },
];

const columns = [
  { id: 'ambassador', name: 'Амбассадор', meta: { sort: true } },
  { id: 'status', name: 'Статус', meta: { sort: true } },
  { id: 'comments', name: 'Комментарии' },
  { id: 'promo', name: 'Промокод' },
  { id: 'telegram', name: 'Телеграмм' },
  { id: 'program', name: 'Программа', meta: { sort: true } },
  { id: 'registration', name: 'Регистрация', meta: { sort: true } },
  { id: 'gender', name: 'Пол', meta: { sort: true } },
  { id: 'address', name: 'Адрес' },
];
const getRowId = 'id';
const initialSettings = [
  { id: 'ambassador', isSelected: true },
  { id: 'status', isSelected: true },
  { id: 'comments', isSelected: true },
  { id: 'promo', isSelected: true },
  { id: 'telegram', isSelected: true },
  { id: 'program', isSelected: true },
  { id: 'registration', isSelected: true },
  { id: 'gender', isSelected: true },
  { id: 'address', isSelected: true },
];

type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;

export default function AmbassadorTable() {
  const [settings, setSettings] = useState<TableSettingsData>(initialSettings);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <MyTable
      data={data}
      columns={columns}
      getRowId={getRowId}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      settings={settings}
      updateSettings={() => {
        setSettings(settings);
        return Promise.resolve();
      }}
    />
  );
}
