import Activity from '../Activity';
import { useGetAmbassadorReportsQuery } from '../../store/amCrm/amCrm.api';
import { Skeleton } from '@gravity-ui/uikit';

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
  return isFetching ? (
    <Skeleton style={{ height: '100px', width: '100%' }} />
  ) : (
    reports && <Activity reports={reports} columns={columns} />
  );
}
