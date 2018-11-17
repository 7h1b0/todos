import { h, Component } from 'preact';

export default class Todo extends Component {
  shouldComponentUpdate({ title, caption }) {
    return title !== this.props.title || caption !== this.props.caption;
  }

  render({ title, caption, onDelete }) {
    return (
      <div class="todo">
        <div>
          <p class="title">{title}</p>
          <p class="caption">Added on: {caption}</p>
        </div>
        <button class="delete" onClick={onDelete} />
      </div>
    );
  }
}
