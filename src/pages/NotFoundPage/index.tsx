import { Button, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <Text variant="body-2"> Данной страницы не существует </Text>
      <Button onClick={() => navigate('/')}> На главную </Button>
    </div>
  );
}
