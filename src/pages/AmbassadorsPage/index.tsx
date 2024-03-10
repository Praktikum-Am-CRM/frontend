import {
  Button,
  DropdownMenu,
  Pagination,
  PaginationProps,
} from '@gravity-ui/uikit';

import AmbassadorTable from '../../components/AmbassadorTable';
import Search from '../../components/Search';
import styles from './styles.module.css';
import Filter from '../../components/Filter';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import ModalWindow from '../../components/ModalWindow';
import CommunicationSection from '../../components/CommunicationSection';
import { useLazyGetAmbassadorsListQuery } from '../../store/amCrm/amCrm.api';
import { useEffect, useState } from 'react';

export default function AmbassadorsPage() {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    pageSize: 15,
  });
  const { setModalContentType, openModal } = useActions();
  const { isModalOpen, contentType: modalContentType } = useAppSelector(
    state => state.modal,
  );

  const { status: selectedStatuses, search: searchedAmbassador } =
    useAppSelector(state => state.amFilters);
  function handleOpenModal() {
    setModalContentType('messages');
    openModal();
  }

  const [triggerAmbQuery, { data: ambListResponse }] =
    useLazyGetAmbassadorsListQuery();

  useEffect(() => {
    triggerAmbQuery({
      status: selectedStatuses,
      page: paginationState.page,
      search: searchedAmbassador,
      limit: paginationState.pageSize,
    });
  }, [selectedStatuses, searchedAmbassador, triggerAmbQuery, paginationState]);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationState(prevState => ({ ...prevState, page, pageSize }));
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
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.pageSize}
          total={ambListResponse?.count}
          onUpdate={handleUpdate}
        />
        <DropdownMenu
          renderSwitcher={props => (
            <div
              {...props}
              style={{ cursor: 'pointer', borderBottom: '1px dotted' }}
            >
              Количество строк
            </div>
          )}
          items={[
            {
              action: () =>
                setPaginationState(prevState => ({
                  ...prevState,
                  pageSize: 100,
                })),
              text: '100',
            },
            {
              action: () =>
                setPaginationState(prevState => ({
                  ...prevState,
                  pageSize: 30,
                })),
              text: '30',
            },
            {
              action: () =>
                setPaginationState(prevState => ({
                  ...prevState,
                  pageSize: 15,
                })),
              text: '15',
            },
          ]}
        />
      </div>
      {isModalOpen && modalContentType === 'messages' && (
        <ModalWindow content={<CommunicationSection />} />
      )}
    </section>
  );
}
