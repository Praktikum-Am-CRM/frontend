/* eslint-disable @typescript-eslint/no-explicit-any */
import { AmbassadorDataType } from '../../types/types';
import TableComponent from '../TableComponent';

const columns = [
  {
    id: 'ambassador',
    name: 'Амбассадор',
    meta: {
      sort: (
        a: { ambassador: { props: { text: string } } },
        b: { ambassador: { props: { text: string } } },
      ) => {
        return a.ambassador.props.text.localeCompare(b.ambassador.props.text);
      },
    },
  },
  {
    id: 'status',
    name: 'Статус',
    meta: {
      sort: (
        a: { status: { props: { children: string } } },
        b: { status: { props: { children: string } } },
      ) => a.status.props.children.localeCompare(b.status.props.children),
    },
  },
  { id: 'promo', name: 'Промокод' },
  { id: 'telegram', name: 'Telegram' },
  {
    id: 'program',
    name: 'Программа',
    meta: {
      sort: (
        a: { program: { props: { text: string } } },
        b: { program: { props: { text: string } } },
      ) => a.program.props.text.localeCompare(b.program.props.text),
    },
  },
  {
    id: 'registration',
    name: 'Регистрация',
    meta: {
      sort: (
        a: { receipt_date: string | number | Date },
        b: { receipt_date: string | number | Date },
      ) => Number(new Date(b.receipt_date)) - Number(new Date(a.receipt_date)),
    },
  },
  {
    id: 'gender',
    name: 'Пол',
    meta: {
      sort: (
        a: { gender: { type: { name: string } } },
        b: { gender: { type: { name: string } } },
      ) => a.gender.type.name.localeCompare(b.gender.type.name),
    },
  },
  { id: 'address', name: 'Адрес' },
];

export default function AmbassadorTable({
  tableRowData,
}: {
  tableRowData: AmbassadorDataType[];
}) {
  return (
    <TableComponent tableRowData={tableRowData} tableHeaderData={columns} />
  );
}
