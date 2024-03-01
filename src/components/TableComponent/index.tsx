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
import { useState } from 'react';

import styles from './styles.module.css';
import { WomanIcon } from '../../images/WomanIcon';
import { ManIcon } from '../../images/ManIcon';
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

export default function TableComponent({
  tableRowData,
  tableHeaderData,
}: {
  tableRowData: TableRowData[];
  tableHeaderData: any[];
}) {
  const { setModalContentType, openModal } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);
  const location = useLocation();

  const [settings, setSettings] = useState<TableSettingsData>(
    tableHeaderData?.map(col => ({ id: col.id, isSelected: true })),
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rowId, setRowId] = useState<string>();

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  const columnsWithAddedProps = tableHeaderData?.map(col => ({
    ...col,
    width: 250,
  }));

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

  function prepareDataForTable(data: TableRowData) {
    return {
      ...data,
      id: data.id,
      ambassador: textWithTooltip(data.ambassador),
      status: data.Status && determineStatus(data.Status),
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
  }

  const content =
    location.pathname === '/ambassadors' ? (
      <AmbassadorCard rowData={rowId} isAmbassador />
    ) : (
      <AmbassadorCard rowData={rowId} />
    );

  return (
    <>
      {tableRowData && columnsWithAddedProps && (
        <MyTable
          className={styles.table}
          onRowClick={evt => {
            setRowId(evt.id);
            setModalContentType('ambassador');
            openModal();
          }}
          emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
          data={tableRowData.map(prepareDataForTable)}
          columns={columnsWithAddedProps}
          settings={settings}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
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
