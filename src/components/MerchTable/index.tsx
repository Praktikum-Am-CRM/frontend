import { Label, Loader, Table, withTableSorting } from '@gravity-ui/uikit';
import { useGetMerchRequestsQuery } from '../../store/amCrm/amCrm.api';
import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import { TextWithTooltip } from '../TextWithTooltip';
import ModalWindow from '../ModalWindow';
import Card from '../Card';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import formatTelNumber from '../../utils/formatTelNumber';

const MyTable = withTableSorting(Table);

const columns = [
  {
    id: 'status',
    name: 'Статус',
    width: 200,
    meta: {
      defaultSortOrder: 'desc',
      sort: (
        a: { status: { props: { children: string } } },
        b: { status: { props: { children: string } } },
      ) => {
        if (a.status.props.children < b.status.props.children) {
          return -1;
        }
        if (a.status.props.children > b.status.props.children) {
          return 1;
        }
        return 0;
      },
    },
  },
  {
    id: 'merchName',
    name: 'Мерч',
    width: 200,
    meta: {
      defaultSortOrder: 'desc',
      sort: (a: { merchName: string }, b: { merchName: string }) => {
        if (a.merchName < b.merchName) {
          return -1;
        }
        if (a.merchName > b.merchName) {
          return 1;
        }
        return 0;
      },
    },
  },
  { id: 'price', name: 'Цена', width: 100 },
  {
    id: 'ambassador',
    name: `Амбассадор`,
    width: 250,
  },
  { id: 'address', name: 'Адрес' },
  { id: 'phone', name: 'Телефон' },
];

function defineStatusLabel(status: string) {
  switch (status) {
    case 'мерч направлен':
      return 'success';
    case 'на подтверждении адреса':
      return 'warning';
    case 'адрес подтвержден':
      return 'info';
    default:
      return 'unknown';
  }
}

export default function MerchTable() {
  const [ambId, setAmbId] = useState<string>('');
  const { data: merch, isFetching } = useGetMerchRequestsQuery();

  const { openModal } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);

  const prepareDataForTable = useCallback((data: MerchRequestListType) => {
    return {
      id: data.ambassadors.id,
      status: (
        <Label theme={defineStatusLabel(data.request_status.status_name)}>
          {data.request_status.status_name}
        </Label>
      ),
      merchName: data.merch.merch_name,
      price: data.merch.price,
      ambassador: (
        <TextWithTooltip
          width="400px"
          text={`${data.ambassadors.first_name} ${data.ambassadors.last_name}`}
        />
      ),
      address: (
        <TextWithTooltip
          width="400px"
          text={`${data.delivery_address.country}, ${data.delivery_address.settlement}, ${data.delivery_address.street}, д.${data.delivery_address.house}, кв.${data.delivery_address.apartment} `}
        />
      ),
      phone: data.ambassadors.phone && formatTelNumber(data.ambassadors.phone),
    };
  }, []);

  function handleClick(id: string) {
    setAmbId(id);
    openModal();
  }

  const content = <Card rowId={ambId} isAmbassador />;

  return (
    <div>
      {isFetching ? (
        <Loader size="l" />
      ) : (
        merch && (
          <MyTable
            className={styles.merchTable}
            onRowClick={evt => {
              handleClick(evt.id);
            }}
            emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
            data={merch.map(prepareDataForTable)}
            columns={columns}
          />
        )
      )}
      {isModalOpen && <ModalWindow content={content} />}
    </div>
  );
}
