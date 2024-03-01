/* eslint-disable @typescript-eslint/no-explicit-any */
import TableComponent from '../TableComponent';

export default function AmbassadorTable(tableRowData: any) {
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
    <TableComponent tableRowData={tableRowData} tableHeaderData={columns} />
  );
}
