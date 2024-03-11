import {
  Button,
  Icon,
  Link,
  Table,
  useToaster,
  withTableSorting,
} from '@gravity-ui/uikit';
import { Check, OctagonXmark } from '@gravity-ui/icons';
import styles from './styles.module.css';
import RatingComponent from '../RatingComponent';
import { useCallback, useMemo } from 'react';

import { ReportQueryType, TableColumnConfig } from '../../types/types';
import { REPORT_STATUSES } from '../../utils/constants';
import { TextWithTooltip } from '../TextWithTooltip/index';
import { usePatchReportMutation } from '../../store/amCrm/amCrm.api';
import { formatDate } from '../../utils/formatDate';

const TableWithSort = withTableSorting(Table);
export default function Activity({
  reports,
  columns,
}: {
  reports: ReportQueryType[];
  columns: TableColumnConfig[];
}) {
  const [patchReportStatus] = usePatchReportMutation();
  const { add } = useToaster();

  const handleReportStatusChange = useCallback(
    (id: string, status: string) =>
      patchReportStatus({ report_id: id, status }),
    [patchReportStatus],
  );

  function renderStatus(status: string) {
    switch (status) {
      case REPORT_STATUSES.ACCEPT:
        return <Icon data={Check} size="16" />;
      case REPORT_STATUSES.REJECT:
        return <Icon data={OctagonXmark} size="16" />;
      default:
        return false;
    }
  }

  const prepareDataForTable = useCallback((data: ReportQueryType) => {
    return {
      id: data.id,
      ambassador: `${data.ambassador?.first_name} ${data.ambassador?.last_name}`,

      placement: (
        <Link view="normal" href={data.content_link}>
          <TextWithTooltip text={data.placement.site} width="150px" />
        </Link>
      ),
      type: (
        <Link
          view="normal"
          href={
            data.screen ||
            'https://thecode.media/wp-content/uploads/2024/03/1-3-1-720x504.jpg'
          }
        >
          <TextWithTooltip text={data.report_type.type_name} width="150px" />
        </Link>
      ),
      date: formatDate(data.report_date, '2-digit', true),
      accept:
        data.report_status === null ? (
          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
          >
            <Button
              view="action"
              size="m"
              onClick={() => {
                handleReportStatusChange(data.id, REPORT_STATUSES.ACCEPT)
                  .then(() => {
                    add({
                      name: 'ratingSuccess',
                      title: 'Успешно одобрили отчёт',
                      autoHiding: 5000,
                      theme: 'success',
                    });
                  })
                  .catch(() =>
                    add({
                      name: 'ratingError',
                      title: 'Не удалось одобрить отчёт',
                      autoHiding: 5000,
                      theme: 'danger',
                    }),
                  );
              }}
            >
              <Icon data={Check} size="16" />
            </Button>
            <Button
              view="normal"
              size="m"
              onClick={() =>
                handleReportStatusChange(data.id, REPORT_STATUSES.REJECT)
                  .then(() => {
                    add({
                      name: 'ratingSuccess',
                      title: 'Успешно отклонили отчёт',
                      autoHiding: 5000,
                      theme: 'success',
                    });
                  })
                  .catch(() =>
                    add({
                      name: 'ratingError',
                      title: 'Не удалось отклонить отчёт',
                      autoHiding: 5000,
                      theme: 'danger',
                    }),
                  )
              }
            >
              <Icon data={OctagonXmark} size="16" />
            </Button>
          </div>
        ) : (
          renderStatus(data.report_status.id)
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
      {preparedTableData && (
        <TableWithSort
          className={styles.activityTable}
          data={preparedTableData}
          columns={columns}
        />
      )}
    </section>
  );
}
