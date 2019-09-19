import { h } from 'preact';
import { useModal } from 'contexts/ModalContext';

const Modal = ({ children }) => {
  const { open, closeModal } = useModal();
  if (open) {
    return (
      <div class="overlay" onClick={closeModal}>
        <div class="popup" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
