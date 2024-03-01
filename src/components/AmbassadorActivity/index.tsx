import styles from './styles.module.css';

export default function AmbassadorActivity({
  user,
}: {
  user: {
    id: string;
    ambassador: string;
    status: string;
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
    <section className={styles.ambassodorActivitySection}>
      {user.id}Activity
    </section>
  );
}
