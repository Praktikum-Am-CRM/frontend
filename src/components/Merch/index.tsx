import styles from './styles.module.css';
import { Button, Table, Text } from '@gravity-ui/uikit';
import { useGetAmbassadorMerchQuery } from '../../store/amCrm/amCrm.api';
import { ArrowDownToSquare } from '@gravity-ui/icons';
import { TextWithTooltip } from '../TextWithTooltip';
import { MerchRequestType } from '../../types/types';

const columns = [
  { id: 'name', name: 'Мерч', width: 92 },
  { id: 'quantity', name: 'Количество', width: 108 },
  { id: 'date', name: 'Дата передачи', width: 128 },
  { id: 'address', name: 'Адрес', width: 92 },
  { id: 'status', name: 'Статус', width: 122 },
  { id: 'copy', name: 'Скопировать', width: 116 },
];

export default function Merch({ userId }: { userId: string }) {
  const { data: ambassadorMerch } = useGetAmbassadorMerchQuery({ id: userId });

  const prepareDataForTable = (data: MerchRequestType) => {
    return {
      name: data.request_merch.merch_name,
      quantity: '1',
      date: data.assignment_date,
      address: (
        <TextWithTooltip
          text={`${data.request_delivery_address.country}, ${data.request_delivery_address.settlement}, ${data.request_delivery_address.street}, д.${data.request_delivery_address.house}, ${data.request_delivery_address.building === null ? '' : `к${data.request_delivery_address.building}`}, кв.${data.request_delivery_address.apartment}`}
          width="92px"
        />
      ),
      status: data.request_status.status_name,
      copy: (
        <Button view="flat">
          <ArrowDownToSquare />
        </Button>
      ),
    };
  };

  return (
    <section className={styles.merch}>
      <Text
        color="complementary"
        variant="body-2"
        className={styles.merch__heading}
      >
        Программа лояльности
      </Text>
      {ambassadorMerch && (
        <Table
          verticalAlign="middle"
          columns={columns}
          data={ambassadorMerch.map(prepareDataForTable)}
        />
      )}
    </section>
  );
}
