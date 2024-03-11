import { Button, Tabs } from '@gravity-ui/uikit';
import MerchTable from '../../components/MerchTable';
import { useState } from 'react';
import { useActions } from '../../hooks/actions';
import ModalWindow from '../../components/ModalWindow';
import Costs from '../../components/Costs';

export default function MerchPage() {
  const [activeTab, setActiveTab] = useState<string>('merch');
  const [isMerch, setIsMerch] = useState<boolean>(true);
  const { openModal } = useActions();
  function handleTabClick(id: string) {
    setActiveTab(id);
    setIsMerch(id === 'merch');
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tabs activeTab={activeTab} size="xl">
          <Tabs.Item
            id="merch"
            title="Мерч"
            onClick={id => {
              handleTabClick(id);
            }}
          />
          {/* <Tabs.Item
            id="expenses"
            title="Расходы на мерч"
            onClick={id => {
              handleTabClick(id);
            }}
          /> */}
        </Tabs>
        <Button view="action" size="l" onClick={() => openModal()}>
          Цены на мерч
        </Button>
      </div>

      {isMerch ? (
        <MerchTable />
      ) : (
        <div>Тут расходы на мерч на каждого амбассадора по месяцам</div>
      )}
      <ModalWindow content={<Costs />} />
    </>
  );
}
