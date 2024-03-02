/* eslint-disable no-console */
import { DropdownMenu } from '@gravity-ui/uikit';

const DropdownMenuButton: React.FC = () => (
  <DropdownMenu
    items={[
      {
        action: event => {
          event.stopPropagation();
          console.log('Нажали отменить');
        },
        text: 'Отменить рассылку',
        theme: 'danger',
      },
      {
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
