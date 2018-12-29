import { h, Component } from 'preact';

export default class Modal extends Component {
  handleClick = e => {
    e.stopPropagation();
  };

  render({ open, children, onClose }) {
    if (open) {
      return (
        <div class="overlay" onClick={onClose}>
          <div class="popup" onClick={this.handleClick}>
            {children}
          </div>
        </div>
      );
    }
    return null;
  }
}
