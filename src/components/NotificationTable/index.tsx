import { useGetAllReportsQuery } from '../../store/amCrm/amCrm.api';
import { TableColumnConfig } from '../../types/types';
import Activity from '../Activity';

const columns: TableColumnConfig[] = [
  { id: 'ambassador', name: 'Амбассадор', width: 300 },
  { id: 'placement', name: 'Площадка', width: 200 },
  { id: 'type', name: 'Тип', width: 300 },
  { id: 'date', name: 'Дата размещения', align: 'center' },
  { id: 'accept', name: 'Одобрено', align: 'center', width: 300 },
  { id: 'rating', name: 'Оценка', align: 'center', width: 120 },
];

export default function NotificationTable() {
  const { data: allReports, isFetching } = useGetAllReportsQuery();

  return (
    <div>
      {allReports && (
        <Activity
          reports={allReports}
          isFetching={isFetching}
          columns={columns}
        />
      )}
    </div>
  );
}
