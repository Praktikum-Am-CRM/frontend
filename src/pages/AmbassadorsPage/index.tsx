import { Button } from '@gravity-ui/uikit';
import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';

export default function AmbassadorsPage() {
  return (
    <section className={styles.ambassadorsPage}>
      <div className={styles.ambassadorsPage__searchContainer}>
        <Search />
        <Button size="xl">Сообщения</Button>
      </div>
      <AmbassadorTable />
    </section>
  );
}
