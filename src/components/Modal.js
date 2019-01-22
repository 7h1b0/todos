import { h } from 'preact';
import { connect } from 'unistore/preact';
import { closeModal } from 'reducers';

const Modal = ({ children, modal, closeModal }) => {
  if (modal) {
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

export default connect(
  'modal',
  { closeModal },
)(Modal);
