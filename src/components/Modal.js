import { h, Component } from 'preact';

export default class Modal extends Component {
  handleClick = e => {
    e.stopPropagation();
  };
  render({ title, open, children, onClose }) {
    if (open) {
      return (
        <div class="overlay" onClick={onClose}>
          <div class="popup" onClick={this.handleClick}>
            <div class="popup-header">
              <p>{title}</p>
              <button class="delete" onClick={onClose} />
            </div>
            {children}
          </div>
        </div>
      );
    }
    return null;
  }
}
