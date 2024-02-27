import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import AmbassadorCard from '../AmbassadorCard';

export default function ModalWindow({ isModalOpened, closeModal, rowData }) {
  const location = useLocation();

  const defineContent = () => {
    if (location.pathname === '/ambassadors') {
      return <AmbassadorCard rowData={rowData} />;
    }
    return null;
  };

  return (
    <div
      className={`${styles.modal} ${isModalOpened === true && `${styles.modal_active}`}`}
    >
      <div className={styles.modal__container}>
        <button
          className={styles.modal__closeIcon}
          onClick={closeModal}
        ></button>
        <div className={styles.modal__content}>{defineContent(location)}</div>
      </div>
    </div>
  );
}
