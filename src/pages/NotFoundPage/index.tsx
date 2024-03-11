import { Button, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import { TEXTS } from '../../utils/constants';

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
      <Text variant="body-2">{TEXTS.NOT_FOUND_PAGE.TEXT}</Text>
      <Button onClick={() => navigate('/')}>
        {TEXTS.NOT_FOUND_PAGE.BUTTON}
      </Button>
    </div>
  );
}
