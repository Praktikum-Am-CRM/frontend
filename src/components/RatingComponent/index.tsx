import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { useState } from 'react';

export default function RatingComponent({
  initialValue,
}: {
  initialValue?: number;
}) {
  const [rating, setRating] = useState(initialValue || 0); // Initial value

  return (
    <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
  );
}
