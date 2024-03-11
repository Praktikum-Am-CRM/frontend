import { Tabs } from '@gravity-ui/uikit';
import NotificationTable from '../../components/NotificationTable';
import { useState } from 'react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<string>('new');

  function handleTabClick(id: string) {
    setActiveTab(id);
  }

  return (
    <>
      <Tabs activeTab={activeTab} size="xl">
        <Tabs.Item
          id="new"
          title="Новые"
          onClick={id => {
            handleTabClick(id);
          }}
        />
        <Tabs.Item
          id="archive"
          title="Архив"
          onClick={id => {
            handleTabClick(id);
          }}
        />
      </Tabs>

      <NotificationTable activeTab={activeTab} />
    </>
  );
}
