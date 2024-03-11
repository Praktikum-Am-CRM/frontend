import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { Button, Icon } from '@gravity-ui/uikit';
import { Xmark } from '@gravity-ui/icons';

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
        <Button
          view="flat"
          size="s"
          onClick={handleCloseModal}
          className={styles.modal__closeIcon}
        >
          <Icon data={Xmark} size={18} />
        </Button>
        <div className={styles.modal__content}>{content}</div>
      </div>
    </div>
  );
}
