import { h } from 'preact';
import { useModal } from 'contexts/ModalContext';

const Modal = ({ children }) => {
  const { open, toggleModal } = useModal();
  if (open) {
    return (
      <div class="overlay" onClick={toggleModal}>
        <div class="popup" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
