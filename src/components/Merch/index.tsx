/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Table, Text } from '@gravity-ui/uikit';
// import { useGetAmbassadorMerchQuery } from '../../store/amCrm/amCrm.api';

export default function Merch() {
//   {
//   user,
// }: {
//   user: any;
//   // user: {
//   //   id: string;
//   //   ambassador: string;
//   //   status: string;
//   //   promo: string;
//   //   telegram: string;
//   //   program: string;
//   //   date_receipt: string;
//   //   gender: string;
//   //   address: string;
//   //   activity: string;
//   // };
// }
  return (
    <section className={styles.merch}>
      <Text
        color="complementary"
        variant="body-2"
        className={styles.merch__heading}
      >
        Программа лояльности
      </Text>
      <Table
        columns={[
          { id: 'merch', name: 'Мерч' },
          { id: 'quantity', name: 'Количество' },
          { id: 'date', name: 'Дата передачи' },
          { id: 'address', name: 'Адрес' },
          { id: 'status', name: 'Статус' },
          { id: 'copy', name: 'Скопировать' },
        ]}
        data={[
          {
            id: '1',
            name: 'ok',
          },
        ]}
      ></Table>
    </section>
  );
}
