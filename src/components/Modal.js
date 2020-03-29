import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useModal } from 'contexts/ModalContext';

const Modal = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  useEffect(() => {
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });
  }, []);

  if (isOpen) {
    return (
      <div class="overlay" onClick={closeModal}>
        <div class="popup" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
