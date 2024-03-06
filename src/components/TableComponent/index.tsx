import {
  Link,
  Table,
  TableColumnConfig,
  TableDataItem,
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
import { AmbassadorDataType } from '../../types/types';
import ModalWindow from '../ModalWindow';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLocation } from 'react-router-dom';
import AmbassadorCard from '../AmbassadorCard';
import determineStatus from '../../utils/determineStatus';

type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;

function determineGender(gender: string) {
  return gender === 'ж' ? <WomanIcon /> : <ManIcon />;
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
  tableRowData: AmbassadorDataType[];
  tableHeaderData: TableColumnConfig<TableDataItem>[];
}) {
  const { setModalContentType, openModal, setRowId } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);
  const rowId = useAppSelector(state => state.table.rowId);
  const location = useLocation();

  const [settings, setSettings] = useState<TableSettingsData>(
    tableHeaderData?.map(col => ({ id: col.id, isSelected: true })),
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMerchDelivery, setIsMerchDelivery] = useState<boolean>(false);

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  const columnsWithAddedProps = tableHeaderData?.map(col => ({
    ...col,
    width: 250,
  }));

  const prepareDataForTable = useMemo(() => {
    return (data: AmbassadorDataType) => {
      return {
        ...data,
        id: data.id,
        ambassador: textWithTooltip(`${data.first_name} ${data.last_name}`),
        status: determineStatus(data.status),
        promo: data.promocode,
        telegram: (
          <Link
            view="normal"
            href={`https://t.me/${data.telegram_bot.nickname}`}
          >
            @{data.telegram_bot.nickname}
          </Link>
        ),
        program: data.programs[0].program_name,
        registration: data.receipt_date,
        gender: determineGender(data.gender),
        address: textWithTooltip(
          ` ${data.address_country}, ${data.address_settlement}, ${data.address_street}, д.${data.address_house}, ${data.address_building !== null && ` к${data.address_building}`}, кв.${data.address_apartment}`,
        ),
        email: data.email,
      };
    };
  }, []);

  const content =
    location.pathname === '/ambassadors' ? (
      <AmbassadorCard
        rowId={rowId}
        isAmbassador
        setIsMerchDelivery={setIsMerchDelivery}
        isMerchDelivery={isMerchDelivery}
      />
    ) : (
      <AmbassadorCard
        rowId={rowId}
        setIsMerchDelivery={setIsMerchDelivery}
        isMerchDelivery={isMerchDelivery}
      />
    );

  const handleRowClick = useCallback(
    (evt: TableDataItem) => {
      setRowId(evt.id);
      if (!(isModalOpen && modalContentType === 'messages')) {
        setModalContentType('ambassador');
        openModal();
      }
    },
    [setRowId, setModalContentType, openModal, isModalOpen, modalContentType],
  );

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
