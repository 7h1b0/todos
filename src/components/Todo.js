import { h, Component } from 'preact';

export default class Todo extends Component {
  shouldComponentUpdate({ title, caption }) {
    return title !== this.props.title || caption !== this.props.caption;
  }

  render({ id, title, caption, onDelete, onDragStart }) {
    return (
      <div class="todo" draggable={true} onDragStart={onDragStart(id)}>
        <div>
          <p class="title">{title}</p>
          <p class="caption">Added on: {caption}</p>
        </div>
        <button class="delete" onClick={onDelete(id)} />
      </div>
    );
  }
}
