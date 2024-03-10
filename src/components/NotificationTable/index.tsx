import { ReportQueryType, TableColumnConfig } from '../../types/types';
import Activity from '../Activity';
import {
  useLazyGetAllReportsQuery,
  useLazyGetUnreadReportsQuery,
} from '../../store/amCrm/amCrm.api';
import { useEffect, useState } from 'react';
import { Pagination, PaginationProps, Skeleton } from '@gravity-ui/uikit';

const columns: TableColumnConfig[] = [
  { id: 'ambassador', name: 'Амбассадор', width: 300, meta: { sort: true } },
  { id: 'placement', name: 'Площадка', width: 200 },
  { id: 'type', name: 'Тип', width: 300 },
  { id: 'date', name: 'Дата размещения', align: 'center' },
  { id: 'accept', name: 'Одобрено', align: 'center', width: 300 },
  { id: 'rating', name: 'Оценка', align: 'center', width: 120 },
];

export default function NotificationTable({
  activeTab,
}: {
  activeTab: string;
}) {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    pageSize: 15,
  });
  const [activeArray, setActiveArray] = useState<ReportQueryType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const [getAllReports] = useLazyGetAllReportsQuery();
  const [getUnreadReports] = useLazyGetUnreadReportsQuery();

  useEffect(() => {
    if (activeTab === 'new') {
      setIsLoading(true);
      getUnreadReports({})
        .unwrap()
        .then(data => {
          setCount(data.count);
          setActiveArray(data.results);
        })
        .finally(() => setIsLoading(false));
    }
    if (activeTab === 'archive') {
      setIsLoading(true);
      getAllReports({})
        .unwrap()
        .then(data => {
          setCount(data.count);
          setActiveArray(data.results);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeTab]);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationState(prevState => ({ ...prevState, page, pageSize }));

    if (activeTab === 'archive')
      getAllReports({
        page,
        limit: pageSize,
      })
        .unwrap()
        .then(data => {
          setActiveArray(data.results);
        });

    if (activeTab === 'new')
      getUnreadReports({
        page,
        limit: pageSize,
      })
        .unwrap()
        .then(data => {
          setActiveArray(data.results);
        });
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton style={{ height: '75vh', width: '100%' }} />
      ) : (
        <Activity reports={activeArray} columns={columns} />
      )}
      {count !== 0 && (
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.pageSize}
          total={count}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
