import { Button } from '@gravity-ui/uikit';
import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';
import Filter from '../../components/Filter';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import ModalWindow from '../../components/ModalWindow';
import CommunicationSection from '../../components/CommunicationSection';
import { useGetAmbassadorsListQuery } from '../../store/amCrm/amCrm.api';
import { STATUSES } from '../../utils/constants';

export default function AmbassadorsPage() {
  const { setModalContentType, openModal } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);

  function handleOpenModal() {
    setModalContentType('messages');
    openModal();
  }

  const { data: ambList } = useGetAmbassadorsListQuery({
    status: [
      STATUSES.ACTIVE,
      STATUSES.PENDING,
      STATUSES.PAUSE,
      STATUSES.DELETED,
    ],
  });

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
      {ambList && <AmbassadorTable tableRowData={ambList} />}
      {isModalOpen && modalContentType === 'messages' && (
        <ModalWindow content={<CommunicationSection />} />
      )}
    </section>
  );
}
