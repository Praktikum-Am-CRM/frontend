import {
  Link,
  Skeleton,
  Table,
  TableColumnConfig,
  TableDataItem,
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
import { formatDate } from '../../utils/formatDate';
import { TextWithTooltip } from '../TextWithTooltip';

type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;

function determineGender(gender: string) {
  return gender === 'ж' ? <WomanIcon /> : <ManIcon />;
}

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
  const selectedUsersIds = useAppSelector(
    state => state.table.selectedUsersIds,
  );
  const location = useLocation();

  const [settings, setSettings] = useState<TableSettingsData>(
    tableHeaderData?.map(col => ({ id: col.id, isSelected: true })),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRowId = 'id';

  const MyTable = withTableSorting(
    withTableSelection(withTableSettings({ sortable: false })(Table)),
  );

  const columnsWithAddedProps = tableHeaderData?.map(col => ({
    ...col,
    width: 200,
  }));

  useEffect(() => {
    setIsLoading(false);
  }, [tableRowData]);

  const prepareDataForTable = useMemo(() => {
    return (data: AmbassadorDataType) => {
      return {
        ...data,
        id: data.id,
        ambassador: (
          <TextWithTooltip text={`${data.first_name} ${data.last_name}`} />
        ),
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
        program: <TextWithTooltip text={data.programs[0].program_name} />,
        registration: formatDate(data.receipt_date, '2-digit'),
        gender: determineGender(data.gender),
        address: (
          <TextWithTooltip
            text={`${data.address_country}, ${data.address_settlement}, ${data.address_street}, д.${data.address_house}, ${data.address_building === null ? '' : `к${data.address_building}`}, кв.${data.address_apartment}`}
          />
        ),
        email: data.email,
      };
    };
  }, []);

  const content =
    location.pathname === '/ambassadors' ? (
      <Card rowId={pickedRowUserId} isAmbassador />
    ) : (
      <Card rowId={pickedRowUserId} />
    );

  const handleRowClick = useCallback(
    (evt: TableDataItem) => {
      setPickedRowUserId(evt.id);
      if (!isModalOpen || modalContentType !== 'messages') {
        setModalContentType('ambassador');
        openModal();
      } else {
        const idExists = selectedUsersIds.includes(evt.id);
        if (idExists) {
          setSelectedUsersIds(selectedUsersIds.filter(id => id !== evt.id));
        } else {
          setSelectedUsersIds([...selectedUsersIds, evt.id]);
        }
      }
    },
    [
      setPickedRowUserId,
      isModalOpen,
      modalContentType,
      setModalContentType,
      openModal,
      setSelectedUsersIds,
      selectedUsersIds,
    ],
  );

  const handleSelectRow = (evt: string[]) => {
    setSelectedUsersIds(evt);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton style={{ height: '75vh', width: '100%' }} />
      ) : (
        tableRowData &&
        columnsWithAddedProps && (
          <MyTable
            className={styles.table}
            onRowClick={evt => {
              handleRowClick(evt);
              if (isMerchDelivery) {
                setIsMerchDelivery(false);
              }
              console.log(evt);
            }}
            emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
            data={tableRowData.map(prepareDataForTable)}
            columns={columnsWithAddedProps}
            settings={settings}
            getRowId={getRowId}
            selectedIds={selectedUsersIds}
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
