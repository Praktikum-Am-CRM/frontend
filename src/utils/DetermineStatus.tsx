import { Label } from '@gravity-ui/uikit';

export default function determineStatus(status: string) {
  switch (status) {
    case 'active':
      return <Label theme="success">Активный</Label>;
    case 'pause':
      return <Label theme="warning">На паузе</Label>;
    case 'pending':
      return <Label theme="unknown">Уточняется</Label>;
    case 'deleted':
      return <Label theme="danger">Не амбассадор</Label>;
    default:
      return null;
  }
}
