import styles from './styles.module.css';
import { Card, Text } from '@gravity-ui/uikit';
import DropdownMenuButtonDelayed from '../DropdownMenuButtonDelayed';
import DropdownMenuButtonChats from '../DropdownMenuButtonChats';
import { formatDate } from '../../utils/formatDate';
import { CardType, Message } from '../../types/types';
import { PinIcon } from '../../assets/icons';

interface CardMessageProps {
  message: Message;
  cardType: CardType;
}

function defineDropdown(cardType: CardType) {
  const dropdownMap = {
    delayed: <DropdownMenuButtonDelayed />,
    chats: <DropdownMenuButtonChats />,
  };

  return dropdownMap[cardType] || null;
}

const CardMessage: React.FC<CardMessageProps> = ({ message, cardType }) => (
  <Card
    view="outlined"
    type="action"
    size="l"
    key={message.id}
    className={styles.card}
    // eslint-disable-next-line no-console
    onClick={() => console.log('Card clicked')}
  >
    <div className={styles.cardLine}>
      <div>
        {cardType !== 'chats' && (
          <Text variant="body-1" color="secondary">
            {'Кому: '}
          </Text>
        )}
        <Text>
          {'recipients' in message ? message.recipients : message.recipient}
        </Text>
        {cardType === 'chats' && message.pinned && (
          <PinIcon className={styles.pin} />
        )}
      </div>
      <Text variant="body-1" color="secondary">
        {formatDate(message.date)}
      </Text>
    </div>
    <div className={styles.cardLine}>
      <Text variant="body-1" color="secondary">
        {message.message}
      </Text>
      {defineDropdown(cardType)}
    </div>
  </Card>
);

export default CardMessage;
