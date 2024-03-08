import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { useState } from 'react';
import { usePatchReportMutation } from '../../store/amCrm/amCrm.api';
import { useToaster } from '@gravity-ui/uikit';

export default function RatingComponent({
  initialValue,
  reportId,
}: {
  initialValue?: number;
  reportId: string;
}) {
  const [rating, setRating] = useState(initialValue || 0);
  const { add } = useToaster();
  const [patchGrade] = usePatchReportMutation();

  const handleChange = (value: number) => {
    patchGrade({ report_id: reportId, grade: rating * 2 })
      .unwrap()
      .then(() => {
        setRating(value);
        add({
          name: 'ratingSuccess',
          title: 'Оценка успешно сохранена',
          autoHiding: 5000,
          theme: 'success',
        });
      })
      .catch(() =>
        add({
          name: 'ratingError',
          title: 'Не удалось сохранить оценку',
          autoHiding: 5000,
          theme: 'danger',
        }),
      );
  };

  return (
    <Rating value={rating} onChange={handleChange} style={{ maxWidth: 120 }} />
  );
}
