import { ArrowToggle, Button } from '@gravity-ui/uikit';

interface CommunicationHistoryProps {
  onClick: () => void;
}

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({
  onClick,
}) => {
  return (
    <>
      <Button onClick={onClick} view="flat">
        <ArrowToggle direction="left" />
      </Button>
      <p>тут будет история сообщений</p>
      <p>тут будет история и отправка</p>
    </>
  );
};

export default CommunicationHistory;
