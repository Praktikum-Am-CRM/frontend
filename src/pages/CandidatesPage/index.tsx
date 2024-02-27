import { Tabs } from '@gravity-ui/uikit';
import CandidateTable from '../../components/CandidateTable';
import { candidateArchiveArray, candidateArray } from '../../utils/mockData';
import { useEffect, useState } from 'react';
import { TableRowData } from '../../types/types';
import styles from './styles.module.css';
import Search from '../../components/Search';

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState<string>('new');
  const [activeArray, setActiveArray] = useState<TableRowData[]>([]);

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
