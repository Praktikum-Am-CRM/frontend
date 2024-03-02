/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export default function ModalWindow({ content }: { content: JSX.Element }) {
  const isModalOpen = useAppSelector(state => state.modal.isModalOpen);
  const { closeModal } = useActions();

  function handleCloseModal() {
    closeModal();
  }

  return (
    <div
      className={`${styles.modal} ${isModalOpen === true && `${styles.modal_active}`}`}
    >
      <div className={styles.modal__container}>
        <button
          className={styles.modal__closeIcon}
          onClick={handleCloseModal}
        ></button>
        <div className={styles.modal__content}>{content}</div>
      </div>
    </div>
  );
}
