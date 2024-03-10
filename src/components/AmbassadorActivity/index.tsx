import Activity from '../Activity';
import { useGetAmbassadorReportsQuery } from '../../store/amCrm/amCrm.api';
import { TableColumnConfig } from '../../types/types';

const columns: TableColumnConfig[] = [
  { id: 'placement', name: 'Площадка' },
  { id: 'type', name: 'Тип' },
  { id: 'date', name: 'Дата размещения', align: 'center' },
  { id: 'accept', name: 'Одобрено', align: 'center' },
  { id: 'rating', name: 'Оценка', align: 'center', width: 120 },
];

export default function AmbassadorActivity({ userId }: { userId: string }) {
  const { data: reports, isFetching } = useGetAmbassadorReportsQuery({
    id: userId,
  });
  return (
    reports && (
      <Activity reports={reports} isFetching={isFetching} columns={columns} />
    )
  );
}
