import { Label } from '@gravity-ui/uikit';
import { STATUSES } from './constants';

export default function defineStatus(status: string) {
  switch (status) {
    case STATUSES.ACTIVE:
      return <Label theme="success">Активный</Label>;
    case STATUSES.PAUSE:
      return <Label theme="warning">На паузе</Label>;
    case STATUSES.PENDING:
      return <Label theme="unknown">Уточняется</Label>;
    case STATUSES.DELETED:
      return <Label theme="danger">Не амбассадор</Label>;
    case STATUSES.ARCHIVE:
      return <Label theme="info">Архив</Label>;
    case STATUSES.CANDIDATE:
      return <Label theme="clear">Кандидат</Label>;
    default:
      return null;
  }
}
