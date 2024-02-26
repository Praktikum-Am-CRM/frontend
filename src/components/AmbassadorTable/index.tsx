import {
  Label,
  Link,
  Table,
  Text,
  Tooltip,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from '@gravity-ui/uikit';
import { useState } from 'react';
import { WomanIcon } from '../../images/WomanIcon';
import { ManIcon } from '../../images/ManIcon';

import styles from './styles.module.css';

const array = [
  {
    id: 1,
    ambassador: 'Амбассадор',
    status: 'Активный',
    promo: '444',
    telegram: 'alter',
    program: 'Фронт',
    registration: '02.02.2022',
    gender: 'woman',
    address: 'Москва, ул. Пушкина, д. 17',
  },

  {
    id: 2,
    ambassador: 'Амбассадор',
    status: 'Статус',
    promo: '44334',
    telegram: 'front',
    program: 'Фронт',
    registration: '02.02.2022',
    gender: 'man',
    address:
      'РФ, Новосибирская область, Бердск, Территория, изъятая из земель подсобного хозяйства Всесоюзного центрального совета профессиональных союзов для организации крестьянского хозяйства, дом 17',
  },

  {
    id: 3,
    ambassador: 'Амба22ссадор',
    status: 'Статус',
    promo: '444',
    telegram: 'moskow',
    program: 'Фронт',
    registration: '02.02.2022',
    gender: 'man',
    address: 'Москва, ул. Пушкина, д. 17',
  },
];

const columns = [
  { id: 'ambassador', name: 'Амбассадор', meta: { sort: true } },
  { id: 'status', name: 'Статус', meta: { sort: true }, width: 130 },
  { id: 'promo', name: 'Промокод', width: 100 },
  { id: 'telegram', name: 'Телеграмм', width: 200 },
  { id: 'program', name: 'Программа', width: 200, meta: { sort: true } },
  { id: 'registration', name: 'Регистрация', width: 130, meta: { sort: true } },
  { id: 'gender', name: 'Пол', meta: { sort: true } },
  { id: 'address', name: 'Адрес', width: 230, style: { whiteSpace: 'wrap' } },
];

type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;

export default function AmbassadorTable() {
  const [settings, setSettings] = useState<TableSettingsData>(
    columns.map(col => ({ id: col.id, isSelected: true })),
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const getRowId = 'id';

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  function determineGender(gender: string) {
    return gender === 'woman' ? <WomanIcon /> : <ManIcon />;
  }

  const prepareDataForTable = (data: (typeof array)[0]) => ({
    id: data.id,
    ambassador: data.ambassador,
    status: <Label theme="success">{data.status}</Label>,
    promo: data.promo,
    telegram: (
      <Link view="normal" href={`https://t.me/${data.telegram}`}>
        {data.telegram}
      </Link>
    ),
    program: data.program,
    registration: data.registration,
    gender: determineGender(data.gender),
    address: (
      <Tooltip content={data.address}>
        <Text ellipsis whiteSpace="nowrap" style={{ maxWidth: '300px' }}>
          {data.address}
        </Text>
      </Tooltip>
    ),
  });

  const finalArray = array.map(prepareDataForTable);

  return (
    <MyTable
      className={styles.table}
      onRowClick={() => null}
      emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
      data={finalArray}
      columns={columns}
      settings={settings}
      getRowId={getRowId}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      updateSettings={checked => {
        setSettings(checked);
        return Promise.resolve();
      }}
    />
  );
}
