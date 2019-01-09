import { h } from 'preact';

const Modal = ({ open, children, onClose }) => {
  if (open) {
    return (
      <div class="overlay" onClick={onClose}>
        <div class="popup" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
