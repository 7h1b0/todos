import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ModalContext } from 'contexts';

const Modal = ({ children }) => {
  const { open, toggleModal } = useContext(ModalContext);
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
