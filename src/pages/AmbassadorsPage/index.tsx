import { Button } from '@gravity-ui/uikit';
import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';
import { ambassadorArray } from '../../utils/mockData';

export default function AmbassadorsPage() {
  function determineAmbassadorArray() {
    return ambassadorArray.filter(ambassador => {
      return ambassador.status === 'pending' || ambassador.status === 'active';
    });
  }

  return (
    <section className={styles.ambassadorsPage}>
      <div className={styles.ambassadorsPage__searchContainer}>
        <Search />
        <Button size="xl">Сообщения</Button>
      </div>
      <AmbassadorTable tableRowData={determineAmbassadorArray()} />
    </section>
  );
}
