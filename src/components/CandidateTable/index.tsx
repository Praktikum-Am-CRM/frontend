import { TableRowData } from '../../types/types';
import TableComponent from '../TableComponent';

export default function CandidateTable({
  candidateArray,
}: {
  candidateArray: TableRowData[];
}) {
  const columns = [
    { id: 'ambassador', name: 'Амбассадор', meta: { sort: true } },
    { id: 'registration', name: 'Регистрация', meta: { sort: true } },
    { id: 'telegram', name: 'Telegram' },
    { id: 'program', name: 'Программа', meta: { sort: true } },
    { id: 'tel', name: 'Телефон' },
    { id: 'email', name: 'Почта' },
    { id: 'gender', name: 'Пол', meta: { sort: true }, align: 'center' },
  ];

  return (
    <TableComponent tableRowData={candidateArray} tableHeaderData={columns} />
  );
}
