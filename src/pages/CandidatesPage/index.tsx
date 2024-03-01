import { Tabs } from '@gravity-ui/uikit';
import CandidateTable from '../../components/CandidateTable';
import { ambassadorArray } from '../../utils/mockData';
import { useEffect, useState } from 'react';
import { TableRowData } from '../../types/types';
import styles from './styles.module.css';
import Search from '../../components/Search';

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState<string>('new');
  const [activeArray, setActiveArray] = useState<TableRowData[]>([]);

  function determineCandidateArchiveArray() {
    return ambassadorArray.filter(ambassador => {
      return ambassador.status === 'deleted';
    });
  }

  const candidateArchiveArray = determineCandidateArchiveArray();

  function determineCandidateArray() {
    return ambassadorArray.filter(ambassador => {
      return ambassador.status === 'candidate';
    });
  }

  const candidateArray = determineCandidateArray();

  useEffect(() => {
    setActiveArray(candidateArray);
  }, []);

  function handleTabClick(id: string) {
    setActiveTab(id);
    setActiveArray(id === 'new' ? candidateArray : candidateArchiveArray);
  }

  return (
    <section className={styles.candidatesPage}>
      <div className={styles.candidatesPage__searchContainer}>
        <Search />
      </div>

      <Tabs activeTab={activeTab} size="xl" className={styles.tabs}>
        <Tabs.Item
          id="new"
          title="Новые"
          onClick={id => {
            handleTabClick(id);
          }}
          counter={candidateArray.length}
        />
        <Tabs.Item
          id="archive"
          title="Архив"
          onClick={id => {
            handleTabClick(id);
          }}
          counter={candidateArchiveArray.length}
        />
      </Tabs>
      <CandidateTable candidateArray={activeArray} />
    </section>
  );
}
