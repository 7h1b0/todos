import { h, Component } from 'preact';
import { formatDate, diffByDay, getClassByDiffDay } from 'utils/utils';

export default class Todo extends Component {
  todoRef = null;
  state = {
    dragging: false,
  };

  setTodoRef = el => {
    this.todoRef = el;
  };

  shouldComponentUpdate({ title, date }, { dragging }) {
    return (
      title !== this.props.title ||
      date !== this.props.date ||
      dragging !== this.state.dragging
    );
  }

  handleDrag = e => {
    const { id } = this.props;
    this.setState({ dragging: true });
    e.dataTransfer.setData('todoId', JSON.stringify({ id }));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  };

  handleDragEnd = () => {
    this.setState({ dragging: false });
  };

  render({ id, title, date, onDelete }, { dragging }) {
    const className = dragging ? 'todo dragging' : 'todo';
    return (
      <div
        ref={this.setTodoRef}
        class={className}
        draggable
        onDragStart={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <div class={getClassByDiffDay(diffByDay(date))}>
          <p class="title">{title}</p>
          <p class="caption">Added on: {formatDate(date)}</p>
        </div>
        <button class="delete" onClick={onDelete(id)} />
      </div>
    );
  }
}
