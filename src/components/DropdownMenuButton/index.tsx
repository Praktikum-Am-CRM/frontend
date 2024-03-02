/* eslint-disable no-console */
import styles from './styles.module.css';
import { DropdownMenu, Icon } from '@gravity-ui/uikit';
import { PenIcon, TrashBinIcon } from '../../assets/icons';

const DropdownMenuButton: React.FC = () => (
  <DropdownMenu
    items={[
      {
        iconStart: <Icon data={TrashBinIcon} className={styles.icon} />,
        action: event => {
          event.stopPropagation();
          console.log('Нажали отменить');
        },
        text: 'Отменить рассылку',
        theme: 'danger',
      },
      {
        iconStart: <Icon data={PenIcon} className={styles.icon} />,
        action: event => {
          event.stopPropagation();
          console.log('Нажали редактировать');
        },
        text: 'Редактировать',
      },
    ]}
    onSwitcherClick={e => e.stopPropagation()}
  />
);

export default DropdownMenuButton;
