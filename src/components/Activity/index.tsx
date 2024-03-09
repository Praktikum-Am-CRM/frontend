/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, Link, Skeleton, Table } from '@gravity-ui/uikit';
import { Check, Paperclip } from '@gravity-ui/icons';
import styles from './styles.module.css';
import RatingComponent from '../RatingComponent';
import { useCallback, useMemo } from 'react';
import {
  useGetAmbassadorReportsQuery,
  usePatchReportMutation,
} from '../../store/amCrm/amCrm.api';
import { ReportQueryType, TableColumnConfig } from '../../types/types';
import { REPORT_STATUSES } from '../../utils/constants';

const columns: TableColumnConfig[] = [
  { id: 'placement', name: 'Площадка', width: 150 },
  { id: 'photo', name: 'Скриншот', align: 'center', width: 30 },
  { id: 'date', name: 'Дата размещения', align: 'center' },
  { id: 'accept', name: 'Состояние', align: 'center' },
  { id: 'rating', name: 'Оценка', align: 'center', width: 120 },
];

export default function Activity({ userId }: { userId: string }) {
  const { data: reports, isFetching } = useGetAmbassadorReportsQuery({
    id: userId,
  });
  const [patchReportStatus] = usePatchReportMutation();

  const handleReportStatusChange = useCallback(
    (status: string) => patchReportStatus({ report_id: userId, status }),
    [patchReportStatus, userId],
  );

  const prepareDataForTable = useCallback((data: ReportQueryType) => {
    return {
      id: data.id,
      placement: (
        <Link view="normal" href={data.content_link}>
          {data.placement.site}
        </Link>
      ),
      photo: data.screen ? (
        <Link view="secondary" href={data.screen}>
          <Icon data={Paperclip} size="16" />
        </Link>
      ) : null,
      date: data.report_date,
      accept:
        data.report_status.status_name === 'Принят' ? (
          <Icon data={Check} size="16" />
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              view="action"
              size="m"
              onClick={() => handleReportStatusChange(REPORT_STATUSES.ACCEPT)}
            >
              Принять
            </Button>
            <Button
              view="normal"
              size="m"
              onClick={() => handleReportStatusChange(REPORT_STATUSES.REJECT)}
            >
              Отказать
            </Button>
          </div>
        ),
      rating: (
        <RatingComponent
          initialValue={Math.round(data.grade / 2)}
          reportId={data.id}
        />
      ),
    };
  }, []);

  const preparedTableData = useMemo(
    () => reports && reports.map(prepareDataForTable),
    [prepareDataForTable, reports],
  );

  return (
    <section className={styles.activity}>
      {isFetching ? (
        <Skeleton style={{ height: '100px', width: '100%' }} />
      ) : (
        preparedTableData && (
          <Table
            className={styles.table}
            data={preparedTableData}
            columns={columns}
          />
        )
      )}
    </section>
  );
}
