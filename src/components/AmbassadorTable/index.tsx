import { ambassadorArray } from '../../utils/mockData';
import TableComponent from '../TableComponent';

export default function AmbassadorTable() {
  const columns = [
    { id: 'ambassador', name: 'Амбассадор', meta: { sort: true } },
    { id: 'status', name: 'Статус', meta: { sort: true } },
    { id: 'promo', name: 'Промокод' },
    { id: 'telegram', name: 'Telegram' },
    { id: 'program', name: 'Программа', meta: { sort: true } },
    { id: 'registration', name: 'Регистрация', meta: { sort: true } },
    { id: 'gender', name: 'Пол', meta: { sort: true } },
    { id: 'address', name: 'Адрес' },
  ];

  return (
    <TableComponent tableRowData={ambassadorArray} tableHeaderData={columns} />
  );
}
