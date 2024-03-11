import { Table, Text } from '@gravity-ui/uikit';

const columns = [
  { id: 'name', name: 'Мерч' },
  { id: 'cost', name: 'Цена' },
];

const data = [
  { name: 'Толстовка', cost: 1000 },
  { name: 'Кофе', cost: 500 },
  { name: 'Стикеры', cost: 500 },
  { name: 'Плюс', cost: 1000 },
  { name: 'Арзамас', cost: 500 },
  { name: 'Шоппер', cost: 1000 },
  { name: 'Рюкзак', cost: 500 },
  { name: 'Сумка кросс', cost: 1000 },
  { name: 'Носки', cost: 500 },
  { name: 'Скидка 50%', cost: 1000 },
  { name: 'Алиса мини', cost: 1000 },
  { name: 'Алиса Биг', cost: 5000 },
  { name: 'Клуб учащихся ночью', cost: 5000 },
];

export default function Costs() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        margin: '30px 30px',
      }}
    >
      <Text variant="header-1" color="primary" style={{ marginBottom: '20px' }}>
        Цена на мерч
      </Text>
      <Table data={data} columns={columns} />
    </div>
  );
}
