export const formatDate = (
  dateString: string,
  monthFormat?: 'long' | 'short' | 'numeric' | '2-digit' | 'narrow' | undefined,
) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: monthFormat,
    year: 'numeric',
    day: '2-digit',
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', dateOptions);
};
