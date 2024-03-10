import { Button, Icon, Link, Skeleton, Table } from '@gravity-ui/uikit';
import { Check, OctagonXmark } from '@gravity-ui/icons';
import styles from './styles.module.css';
import RatingComponent from '../RatingComponent';
import { useCallback, useMemo } from 'react';

import { ReportQueryType, TableColumnConfig } from '../../types/types';
import { REPORT_STATUSES } from '../../utils/constants';
import { TextWithTooltip } from '../TextWithTooltip/index';
import { usePatchReportMutation } from '../../store/amCrm/amCrm.api';

export default function Activity({
  reports,
  isFetching,
  columns,
}: {
  reports: ReportQueryType[];
  isFetching: boolean;
  columns: TableColumnConfig[];
}) {
  const [patchReportStatus] = usePatchReportMutation();

  const handleReportStatusChange = useCallback(
    (id: string, status: string) =>
      patchReportStatus({ report_id: id, status }),
    [patchReportStatus],
  );

  function renderStatus(statusId: string, reportId: string) {
    switch (statusId) {
      case REPORT_STATUSES.ACCEPT:
        return <Icon data={Check} size="16" />;
      case REPORT_STATUSES.REJECT:
        return <Icon data={OctagonXmark} size="16" />;
      default:
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              view="action"
              size="m"
              onClick={() =>
                handleReportStatusChange(reportId, REPORT_STATUSES.ACCEPT)
              }
            >
              <Icon data={Check} size="16" />
            </Button>
            <Button
              view="normal"
              size="m"
              onClick={() =>
                handleReportStatusChange(reportId, REPORT_STATUSES.REJECT)
              }
            >
              <Icon data={OctagonXmark} size="16" />
            </Button>
          </div>
        );
    }
  }

  const prepareDataForTable = useCallback((data: ReportQueryType) => {
    return {
      id: data.id,
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
      date: data.report_date,
      accept: renderStatus(data.report_status.id, data.id),
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
            className={styles.activityTable}
            data={preparedTableData}
            columns={columns}
          />
        )
      )}
    </section>
  );
}
