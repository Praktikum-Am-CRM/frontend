import styles from './styles.module.css';

export default function AmbassadorHistory({
  user,
}: {
  user: {
    id: string;
    ambassador: string;
    Status: string;
    promo: string;
    telegram: string;
    program: string;
    date_receipt: string;
    gender: string;
    address: string;
    activity: string;
  };
}) {
  return (
    <section className={styles.ambassodorMerchSection}>
      {user.id}History
    </section>
  );
}
