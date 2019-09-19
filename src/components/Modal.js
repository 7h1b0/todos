import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useModal } from 'contexts/ModalContext';

const Modal = ({ children }) => {
  const { open, closeModal } = useModal();

  useEffect(() => {
    window.addEventListener('keyup', event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    });

    return () => window.removeEventListener('keyup');
  }, []);

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
