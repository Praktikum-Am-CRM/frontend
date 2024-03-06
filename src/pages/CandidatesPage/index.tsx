/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from '@gravity-ui/uikit';
import CandidateTable from '../../components/CandidateTable';

import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import Search from '../../components/Search';
import { STATUSES } from '../../utils/constants';
import { useGetAmbassadorsListQuery } from '../../store/amCrm/amCrm.api';

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState<string>('new');
  const [activeArray, setActiveArray] = useState<any>([]);

  const { data: candidateList, isFetching } = useGetAmbassadorsListQuery({
    status: STATUSES.CANDIDATE,
  });
  const { data: candidateArchiveList } = useGetAmbassadorsListQuery({
    status: STATUSES.ARCHIVE,
  });

  useEffect(() => {
    setActiveArray(candidateList);
  }, [candidateList]);

  function handleTabClick(id: string) {
    setActiveTab(id);
    setActiveArray(id === 'new' ? candidateList : candidateArchiveList);
  }

  return (
    <section className={styles.candidatesPage}>
      <div className={styles.candidatesPage__searchContainer}>
        <Search />
      </div>
      {isFetching ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <Tabs activeTab={activeTab} size="xl" className={styles.tabs}>
            <Tabs.Item
              id="new"
              title="Новые"
              onClick={id => {
                handleTabClick(id);
              }}
              counter={candidateList?.length}
            />
            <Tabs.Item
              id="archive"
              title="Архив"
              onClick={id => {
                handleTabClick(id);
              }}
              counter={candidateArchiveList?.length}
            />
          </Tabs>
          <CandidateTable candidateArray={activeArray} />
        </>
      )}
    </section>
  );
}
