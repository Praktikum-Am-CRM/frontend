import { ReportQueryType, TableColumnConfig } from '../../types/types';
import Activity from '../Activity';

const columns: TableColumnConfig[] = [
  { id: 'ambassador', name: 'Амбассадор', width: 300 },
  { id: 'placement', name: 'Площадка', width: 200 },
  { id: 'type', name: 'Тип', width: 300 },
  { id: 'date', name: 'Дата размещения', align: 'center' },
  { id: 'accept', name: 'Одобрено', align: 'center', width: 300 },
  { id: 'rating', name: 'Оценка', align: 'center', width: 120 },
];

export default function NotificationTable({
  reports,
}: {
  reports: ReportQueryType[];
}) {
  return (
    <div>{reports && <Activity reports={reports} columns={columns} />}</div>
  );
}
