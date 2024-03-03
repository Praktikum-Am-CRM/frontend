/* eslint-disable no-console */
import styles from './styles.module.css';
import { DropdownMenu, Icon } from '@gravity-ui/uikit';
import { PinIcon, TrashBinIcon } from '../../assets/icons';

const DropdownMenuButtonChats: React.FC = () => (
  <DropdownMenu
    items={[
      {
        iconStart: <Icon data={TrashBinIcon} className={styles.icon} />,
        action: event => {
          event.stopPropagation();
          console.log('Нажали удалить чат');
        },
        text: 'Удалить чат',
        theme: 'danger',
      },
      {
        iconStart: <Icon data={PinIcon} className={styles.icon} />,
        action: event => {
          event.stopPropagation();
          console.log('Нажали закрепить чат');
        },
        text: 'Закрепить',
      },
    ]}
    onSwitcherClick={e => e.stopPropagation()}
  />
);

export default DropdownMenuButtonChats;
