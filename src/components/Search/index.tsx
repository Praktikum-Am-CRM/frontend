import { Button, Icon, TextInput } from '@gravity-ui/uikit';
import VerticalSlidersIcon from '../../images/VerticalSlidersIcon';
import styles from './styles.module.css';

export default function Search() {
  return (
    <div className={styles.searchContainer}>
      <TextInput
        placeholder="Поиск по имени"
        size="xl"
        style={{ width: '400px' }}
      />
      <Button size="xl">
        <Icon data={VerticalSlidersIcon} size={18} />
      </Button>
    </div>
  );
}
