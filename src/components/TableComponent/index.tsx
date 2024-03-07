import {
  Link,
  Skeleton,
  Table,
  TableColumnConfig,
  TableDataItem,
  Text,
  Tooltip,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from '@gravity-ui/uikit';
import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';
import { WomanIcon } from '../../assets/images/WomanIcon';
import { ManIcon } from '../../assets/images/ManIcon';
import { AmbassadorDataType } from '../../types/types';
import ModalWindow from '../ModalWindow';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLocation } from 'react-router-dom';
import Card from '../Card';
import defineStatus from '../../utils/defineStatus';

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
  const {
    setModalContentType,
    openModal,
    setPickedRowUserId,
    setSelectedUsersIds,
  } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);
  const pickedRowUserId = useAppSelector(state => state.table.pickedRowUserId);
  const location = useLocation();

  const [settings, setSettings] = useState<TableSettingsData>(
    tableHeaderData?.map(col => ({ id: col.id, isSelected: true })),
  );

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [isMerchDelivery, setIsMerchDelivery] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  const columnsWithAddedProps = tableHeaderData?.map(col => ({
    ...col,
    width: 250,
  }));

  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 400);

  useEffect(() => {
    setIsLoading(false);
  }, [tableRowData]);

  const prepareDataForTable = useMemo(() => {
    return (data: AmbassadorDataType) => {
      return {
        ...data,
        id: data.id,
        ambassador: textWithTooltip(`${data.first_name} ${data.last_name}`),
        status: defineStatus(data.status),
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
      <Card
        rowId={pickedRowUserId}
        isAmbassador
        setIsMerchDelivery={setIsMerchDelivery}
        isMerchDelivery={isMerchDelivery}
      />
    ) : (
      <Card
        rowId={pickedRowUserId}
        setIsMerchDelivery={setIsMerchDelivery}
        isMerchDelivery={isMerchDelivery}
      />
    );

  const handleRowClick = useCallback(
    (evt: TableDataItem) => {
      setPickedRowUserId(evt.id);
      if (!(isModalOpen && modalContentType === 'messages')) {
        setModalContentType('ambassador');
        openModal();
      }
    },
    [
      setPickedRowUserId,
      setModalContentType,
      openModal,
      isModalOpen,
      modalContentType,
    ],
  );

  const handleSelectRow = (evt: string[]) => {
    setSelectedRowIds(evt);

    const res: string[] = [];
    evt.forEach((rowID: string) => {
      res.push(tableRowData[Number(rowID)].id);
    });

    setSelectedUsersIds(res);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton style={{ height: '75vh', width: '95vw' }} />
      ) : (
        tableRowData &&
        columnsWithAddedProps && (
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
        )
      )}
      {isModalOpen && modalContentType === 'ambassador' && (
        <ModalWindow content={content} />
      )}
    </>
  );
}
