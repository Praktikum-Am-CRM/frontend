import { Button } from '@gravity-ui/uikit';
import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';
import Filter from '../../components/Filter';
import { ambassadorArray } from '../../utils/mockData';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import ModalWindow from '../../components/ModalWindow';
import CommunicationSection from '../../components/CommunicationSection';

export default function AmbassadorsPage() {
  const { setModalContentType, openModal } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);

  function handleOpenModal() {
    setModalContentType('messages');
    openModal();
  }

  function determineAmbassadorArray() {
    return ambassadorArray.filter(ambassador => {
      return ambassador.status === 'pending' || ambassador.status === 'active';
    });
  }

  return (
    <section className={styles.ambassadorsPage}>
      <div className={styles.ambassadorsPage__container}>
        <div className={styles.ambassadorsPage__searchContainer}>
          <Search />
          <Filter />
        </div>
        <Button size="xl" onClick={handleOpenModal}>
          Сообщения
        </Button>
      </div>
      <AmbassadorTable tableRowData={determineAmbassadorArray()} />
      {isModalOpen && modalContentType === 'messages' && (
        <ModalWindow content={<CommunicationSection />} />
      )}
    </section>
  );
}
