import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useModal } from 'contexts/ModalContext';

function Modal({ children }) {
  const { isOpen, closeModal } = useModal();

  function handleKeyUp(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', handleKeyUp);
    }
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [isOpen]);

  if (isOpen) {
    return (
      <div class="overlay" onClick={closeModal}>
        <div
          aria-modal="true"
          role="dialog"
          class="popup"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;
