import { Tabs } from '@gravity-ui/uikit';
import MerchTable from '../../components/MerchTable';
import { useState } from 'react';

export default function MerchPage() {
  const [activeTab, setActiveTab] = useState<string>('merch');
  const [isMerch, setIsMerch] = useState<boolean>(true);

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
      </div>

      {isMerch ? (
        <MerchTable />
      ) : (
        <div>Тут расходы на мерч на каждого амбассадора по месяцам</div>
      )}
    </>
  );
}
