import styles from './styles.module.css';
import { Button, Skeleton, Table, Text, useToaster } from '@gravity-ui/uikit';
import { useGetAmbassadorMerchQuery } from '../../store/amCrm/amCrm.api';
import { ArrowDownToSquare } from '@gravity-ui/icons';
import { TextWithTooltip } from '../TextWithTooltip';
import { MerchRequestType } from '../../types/types';

const columns = [
  { id: 'name', name: 'Мерч', width: 100 },
  { id: 'quantity', name: 'Количество', width: 100 },
  { id: 'date', name: 'Дата передачи', width: 130 },
  { id: 'address', name: 'Адрес', width: 100 },
  { id: 'status', name: 'Статус', width: 130 },
  { id: 'copy', name: 'Скопировать', width: 100 },
];

export default function Merch({ userId }: { userId: string }) {
  const { data: ambassadorMerch, isFetching } = useGetAmbassadorMerchQuery({
    id: userId,
  });
  const { add } = useToaster();
  const handleCopyClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        add({
          name: 'clipboard',
          title: 'Информация скопирована в буфер обмена',
          theme: 'success',
          autoHiding: 5000,
        });
      })
      .catch(() => {
        add({
          name: 'clipboard',
          title: 'Информация не скопирована в буфер обмена',
          theme: 'danger',
          autoHiding: 5000,
        });
      });
  };

  const prepareDataForTable = (data: MerchRequestType) => {
    const address = `${data.request_delivery_address.country}, ${data.request_delivery_address.settlement}, ${data.request_delivery_address.street}, д.${data.request_delivery_address.house}, ${data.request_delivery_address.building === null ? '' : `к${data.request_delivery_address.building}`}, кв.${data.request_delivery_address.apartment}`;
    return {
      name: data.request_merch.merch_name,
      quantity: '1',
      date: data.assignment_date,
      address: <TextWithTooltip text={address} width="92px" />,
      status: data.request_status.status_name,
      copy: (
        <Button
          view="flat"
          onClick={() =>
            handleCopyClick(
              `${data.request_merch.merch_name} 1 шт по адресу ${address} ${data.request_status.status_name}`,
            )
          }
        >
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
      {isFetching ? (
        <Skeleton style={{ height: '100px', width: '100%' }} />
      ) : (
        ambassadorMerch && (
          <Table
            verticalAlign="top"
            columns={columns}
            data={ambassadorMerch.map(prepareDataForTable)}
          />
        )
      )}
    </section>
  );
}
