/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, Link, Table, Text } from '@gravity-ui/uikit';
import { Check, Paperclip } from '@gravity-ui/icons';
import styles from './styles.module.css';
import RatingComponent from '../RatingComponent';

type TableColumnConfig = {
  id: string;
  name: string;
  width?: number;
  align?: 'left' | 'right' | 'center';
  meta?: {
    sort?: boolean;
  };
};

export default function AmbassadorActivity({ user }: { user: any }) {
  console.log(user.id);
  const columns = [
    { id: 'place', name: 'Площадка', width: 500 },
    { id: 'photo', name: 'Скриншот', align: 'center' },
    { id: 'date', name: 'Дата размещения', align: 'center' },
    { id: 'accept', name: 'Состояние' },
    { id: 'rating', name: 'Оценка (1-5)', align: 'center' },
  ];

  const tableData = [
    {
      place: 'Площадка 1',
      photo: 'https://placehold.it/300x300',
      date: '01.01.2022',
      rating: 2,
    },
    {
      place: 'Площадка 2',
      photo: 'https://placehold.it/300x300',
      date: '01.01.2022',
      rating: 5,
      accept: true,
    },
    {
      place: 'Площадка 1',
      photo: 'https://placehold.it/300x300',
      date: '01.01.2022',
      rating: 2,
    },
    {
      place: 'Площадка 2',
      photo: 'https://placehold.it/300x300',
      date: '01.01.2022',
      rating: 5,
    },
  ];

  function prepareDataForTable(data: any) {
    return {
      id: data.id,
      place: (
        <Link view="normal" href={data.place}>
          {data.place}
        </Link>
      ),
      photo: (
        <Link view="secondary" href={data.photo}>
          <Icon data={Paperclip} size="16" />
        </Link>
      ),
      date: data.date,
      accept: data.accept ? (
        <Icon data={Check} size="16" />
      ) : (
        <Button view="action" size="m">
          Принять
        </Button>
      ),
      rating: <RatingComponent initialValue={data.rating} />,
    };
  }

  return (
    <section className={styles.ambassodorActivity}>
      <Text variant="body-2">Первый этап</Text>
      <Table
        className={styles.table}
        data={tableData.map(prepareDataForTable)}
        columns={columns as TableColumnConfig[]}
      />
      <Text variant="body-2">Прохождение гайда</Text>
      <Table
        className={styles.table}
        data={tableData.map(prepareDataForTable)}
        columns={columns as TableColumnConfig[]}
      />
    </section>
  );
}
