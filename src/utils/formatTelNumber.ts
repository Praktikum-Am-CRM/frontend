export default function formatTelNumber(phone: string) {
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
}
