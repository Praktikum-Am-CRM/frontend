import { Button, Pagination, PaginationProps, Select } from '@gravity-ui/uikit';

import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';
import Filter from '../../components/Filter';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import ModalWindow from '../../components/ModalWindow';
import CommunicationSection from '../../components/CommunicationSection';
import { useLazyGetAmbassadorsListQuery } from '../../store/amCrm/amCrm.api';
import { STATUSES } from '../../utils/constants';
import { useEffect, useState } from 'react';

export default function AmbassadorsPage() {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    pageSize: 15,
  });
  const { setModalContentType, openModal } = useActions();
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const modalContentType = useAppSelector(state => state.modal.contentType);

  function handleOpenModal() {
    setModalContentType('messages');
    openModal();
  }

  const [triggerAmbQuery, { data: ambListResponse }] =
    useLazyGetAmbassadorsListQuery();

  useEffect(() => {
    triggerAmbQuery({
      status: [
        STATUSES.ACTIVE,
        STATUSES.PENDING,
        STATUSES.PAUSE,
        STATUSES.DELETED,
      ],
      page: 1,
    });
  }, []);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationState(prevState => ({ ...prevState, page, pageSize }));
    triggerAmbQuery({
      status: [
        STATUSES.ACTIVE,
        STATUSES.PENDING,
        STATUSES.PAUSE,
        STATUSES.DELETED,
      ],
      page,
    });
  };

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
      {ambListResponse && (
        <AmbassadorTable tableRowData={ambListResponse.results} />
      )}
      <Pagination
        page={paginationState.page}
        pageSize={paginationState.pageSize}
        total={ambListResponse?.count}
        onUpdate={handleUpdate}
      />
      <Select>
        <Select.Option value="all">Все</Select.Option>
      </Select>
      {isModalOpen && modalContentType === 'messages' && (
        <ModalWindow content={<CommunicationSection />} />
      )}
    </section>
  );
}
