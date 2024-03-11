import { Pagination, PaginationProps, Tabs } from '@gravity-ui/uikit';
import CandidateTable from '../../components/CandidateTable';

import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { STATUSES } from '../../utils/constants';
import {
  useGetAmbassadorsListQuery,
  useLazyGetAmbassadorsListQuery,
} from '../../store/amCrm/amCrm.api';

export default function CandidatesPage() {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    pageSize: 15,
  });
  const [activeTab, setActiveTab] = useState<string>('new');
  const [activeArray, setActiveArray] = useState<AmbassadorDataType[]>([]);

  const [triggerCandidateQuery, { data: candidateListResponse }] =
    useLazyGetAmbassadorsListQuery();

  const { data: candidateArchiveListResponse } = useGetAmbassadorsListQuery({
    status: STATUSES.ARCHIVE,
  });

  useEffect(() => {
    triggerCandidateQuery({
      status: STATUSES.CANDIDATE,
      page: 1,
    });
  }, []);

  useEffect(() => {
    setActiveArray(candidateListResponse?.results ?? []);
  }, [candidateListResponse]);

  function handleTabClick(id: string) {
    setActiveTab(id);
    setActiveArray(
      id === 'new'
        ? candidateListResponse?.results ?? []
        : candidateArchiveListResponse?.results ?? [],
    );
  }

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationState(prevState => ({ ...prevState, page, pageSize }));

    triggerCandidateQuery({
      status: activeTab === 'new' ? STATUSES.CANDIDATE : STATUSES.ARCHIVE,
      page,
    });
  };

  return (
    <section className={styles.candidatesPage}>
      <Tabs activeTab={activeTab} size="xl" className={styles.tabs}>
        <Tabs.Item
          id="new"
          title="Новые"
          onClick={id => {
            handleTabClick(id);
          }}
          counter={candidateListResponse?.count}
        />
        <Tabs.Item
          id="archive"
          title="Архив"
          onClick={id => {
            handleTabClick(id);
          }}
          counter={candidateArchiveListResponse?.count}
        />
      </Tabs>
      <CandidateTable candidateArray={activeArray} />
      <Pagination
        page={paginationState.page}
        pageSize={paginationState.pageSize}
        total={candidateListResponse?.count}
        onUpdate={handleUpdate}
      />
    </section>
  );
}
