/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Button, Table, Text } from '@gravity-ui/uikit';
import { useGetAmbassadorMerchQuery } from '../../store/amCrm/amCrm.api';
import { CopyIcon } from '../../assets/images/CopyIcon';
import { TextWithTooltip } from '../TextWithTooltip';

export default function Merch({
  user,
}: {
  user: any;
  // user: {
  //   id: string;
  //   ambassador: string;
  //   status: string;
  //   promo: string;
  //   telegram: string;
  //   program: string;
  //   date_receipt: string;
  //   gender: string;
  //   address: string;
  //   activity: string;
  // };
}) {
  const { data: ambassadorMerch } = useGetAmbassadorMerchQuery({ id: user.id });

  console.log({ ambassadorMerch });

  const prepareDataForTable = (data: any) => {
    return {
      name: data.request_merch.merch_name,
      quantity: '1',
      date: data.assignment_date,
      address: (
        <TextWithTooltip
          text={` ${data.request_delivery_address.country}, ${data.request_delivery_address.settlement}, ${data.request_delivery_address.street}, д.${data.request_delivery_address.house}, ${data.request_delivery_address.building === null ? '' : `к${data.request_delivery_address.building}`}, кв.${data.request_delivery_address.apartment}`}
          width="92px"
        />
      ),
      status: data.request_status.status_name,
      copy: (
        <Button view="raised">
          <CopyIcon />
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
          columns={[
            { id: 'name', name: 'Мерч', width: 92 },
            { id: 'quantity', name: 'Количество', width: 108 },
            { id: 'date', name: 'Дата передачи', width: 128 },
            { id: 'address', name: 'Адрес', width: 92 },
            { id: 'status', name: 'Статус', width: 122 },
            { id: 'copy', name: 'Скопировать', width: 116 },
          ]}
          data={ambassadorMerch.map(prepareDataForTable)}
        ></Table>
      )}
    </section>
  );
}
