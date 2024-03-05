/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link,
  Table,
  Text,
  Tooltip,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from '@gravity-ui/uikit';
import { useCallback, useMemo, useState } from 'react';

import styles from './styles.module.css';
import { WomanIcon } from '../../assets/images/WomanIcon';
import { ManIcon } from '../../assets/images/ManIcon';
import { TableRowData } from '../../types/types';
import ModalWindow from '../ModalWindow';
import determineStatus from '../../utils/DetermineStatus';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLocation } from 'react-router-dom';
import AmbassadorCard from '../AmbassadorCard';

type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;

function determineGender(gender: string) {
  return gender === 'woman' ? <WomanIcon /> : <ManIcon />;
}

const textWithTooltip = (text: string) => (
  <Tooltip content={text}>
    <Text ellipsis whiteSpace="nowrap" style={{ maxWidth: '300px' }}>
      {text}
    </Text>
  </Tooltip>
);

export default function TableComponent({
  tableRowData,
  tableHeaderData,
}: {
  tableRowData: TableRowData[];
  tableHeaderData: any[];
}) {
  const {
    setModalContentType,
    openModal,
    setClickedRowId,
    setSelectedUsersIds,
  } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);
  const rowId = useAppSelector(state => state.table.rowId);
  const location = useLocation();

  const [settings, setSettings] = useState<TableSettingsData>(
    tableHeaderData?.map(col => ({ id: col.id, isSelected: true })),
  );

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  const columnsWithAddedProps = tableHeaderData?.map(col => ({
    ...col,
    width: 250,
  }));

  const prepareDataForTable = useMemo(() => {
    return (data: TableRowData) => {
      return {
        ...data,
        id: data.id,
        ambassador: textWithTooltip(data.ambassador),
        status: data.status && determineStatus(data.status),
        promo: data.promo,
        telegram: (
          <Link view="normal" href={`https://t.me/${data.telegram}`}>
            @{data.telegram}
          </Link>
        ),
        program: data.program,
        registration: data.registration,
        gender: determineGender(data.gender),
        address: data.address && textWithTooltip(data.address),
        tel: data.tel,
        email: data.email,
      };
    };
  }, []);

  const content =
    location.pathname === '/ambassadors' ? (
      <AmbassadorCard rowData={rowId} isAmbassador />
    ) : (
      <AmbassadorCard rowData={rowId} />
    );

  const handleRowClick = useCallback(
    (evt: any) => {
      setClickedRowId(evt.id);
      if (!(isModalOpen && modalContentType === 'messages')) {
        setModalContentType('ambassador');
        openModal();
      }
    },
    [
      setClickedRowId,
      setModalContentType,
      openModal,
      isModalOpen,
      modalContentType,
    ],
  );

  const handleSelectRow = (evt: any) => {
    setSelectedRowIds(evt);

    const res: string[] = [];
    evt.forEach((rowID: string) => {
      res.push(tableRowData[Number(rowID)].id);
    });

    setSelectedUsersIds(res);
  };

  return (
    <>
      {tableRowData && columnsWithAddedProps && (
        <MyTable
          className={styles.table}
          onRowClick={evt => handleRowClick(evt)}
          emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
          data={tableRowData.map(prepareDataForTable)}
          columns={columnsWithAddedProps}
          settings={settings}
          selectedIds={selectedRowIds}
          onSelectionChange={handleSelectRow}
          updateSettings={checked => {
            setSettings(checked);
            return Promise.resolve();
          }}
        />
      )}
      {isModalOpen && modalContentType === 'ambassador' && (
        <ModalWindow content={content} />
      )}
    </>
  );
}
