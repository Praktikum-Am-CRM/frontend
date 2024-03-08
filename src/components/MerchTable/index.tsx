import { Label, Loader, Table, withTableSorting } from '@gravity-ui/uikit';
import { useGetMerchRequestsQuery } from '../../store/amCrm/amCrm.api';
import styles from './styles.module.css';
import { useCallback } from 'react';
import { MerchRequestListType } from '../../types/types';
import { TextWithTooltip } from '../TextWithTooltip';

export default function MerchTable() {
  const { data: merch, isFetching } = useGetMerchRequestsQuery();

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
    { id: 'size', name: 'Размер' },
    {
      id: 'ambassador',
      name: `Амбассадор`,
    },
    { id: 'address', name: 'Адрес' },
    { id: 'tel', name: 'Телефон' },
    { id: 'сomment', name: 'Комментарий', width: 300 },
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

  const prepareDataForTable = useCallback((data: MerchRequestListType) => {
    return {
      id: data.id,
      status: (
        <Label theme={defineStatusLabel(data.request_status.status_name)}>
          {data.request_status.status_name}
        </Label>
      ),
      merchName: data.merch.merch_name,
      size: `-`,
      ambassador: (
        <TextWithTooltip
          text={`${data.ambassadors.first_name} ${data.ambassadors.last_name}`}
        />
      ),
      address: (
        <TextWithTooltip
          width="300px"
          text={`${data.delivery_address.country}, ${data.delivery_address.settlement}, ${data.delivery_address.street}, д.${data.delivery_address.house}, кв.${data.delivery_address.apartment} `}
        />
      ),
      tel: `-`,
      сomment: `-`,
    };
  }, []);

  return (
    <div>
      {isFetching ? (
        <Loader size="l" />
      ) : (
        merch && (
          <MyTable
            className={styles.table}
            onRowClick={evt => {
              console.log(evt);
            }}
            emptyMessage="Ничего не найдено ¯\_(ツ)_/¯"
            data={merch.map(prepareDataForTable)}
            columns={columns}
          />
        )
      )}
    </div>
  );
}
