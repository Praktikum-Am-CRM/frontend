import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import {
  BookOpen,
  ClockArrowRotateLeft,
  PencilToSquare,
} from '@gravity-ui/icons';

type MessageType = 'delayed' | 'drafts' | 'history';

const iconComponents = {
  delayed: ClockArrowRotateLeft,
  drafts: PencilToSquare,
  history: BookOpen,
};

const text = {
  delayed: 'Нет отложенных рассылок',
  drafts: 'Нет черновиков',
  history: 'Нет истории рассылок',
};

const EmptyMessageTab = ({ type }: { type: MessageType }) => {
  const IconComponent = iconComponents[type];
  return (
    <div className={styles.root}>
      <Text variant="subheader-3" color="hint">
        {text[type]}
      </Text>
      <IconComponent className={styles.emptyIcon} />
    </div>
  );
};

export default EmptyMessageTab;
