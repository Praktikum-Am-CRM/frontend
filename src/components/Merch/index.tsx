/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';

export default function Merch({
  user,
}: {
  user: any;
  // user: {
  //   id: string;
  //   ambassador: string;
  //   status: string;
  //   promo: string;
  //   telegram: string;
  //   program: string;
  //   date_receipt: string;
  //   gender: string;
  //   address: string;
  //   activity: string;
  // };
}) {
  return <section className={styles.merch}>{user.id}Merch</section>;
}