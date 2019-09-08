import { h, Component } from 'preact';

import TaskContext from 'contexts/TaskContext';
import { formatDate, classNames } from 'utils/utils';
import { removeTask } from 'utils/actions';
import { DONE } from 'utils/categories';

class Task extends Component {
  state = {
    dragging: false,
  };

  shouldComponentUpdate({ title }, { dragging }) {
    return title !== this.props.title || dragging !== this.state.dragging;
  }

  handleDrag = e => {
    this.setState({ dragging: true });
    e.dataTransfer.setData('task', JSON.stringify(this.props));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  };

  handleDragEnd = () => {
    this.setState({ dragging: false });
  };

  handleRemove = dispatch => () => {
    dispatch(removeTask(this.props.id));
  };

  render({ title, date, dueDate, categoryId }, { dragging }) {
    const isDueDatePast = categoryId !== DONE.id && dueDate && dueDate < date;
    return (
      <div
        class={classNames(
          'task',
          dragging && 'dragging',
          isDueDatePast && 'outdated',
        )}
        draggable
        onDragStart={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <div class="content">
          <p class="title">{title}</p>
          <p class="caption">Added on: {formatDate(date)}</p>
          {dueDate ? (
            <p class="caption">Due date: {formatDate(dueDate)}</p>
          ) : null}
        </div>
        <TaskContext.Consumer>
          {dispatch => (
            <button class="delete" onClick={this.handleRemove(dispatch)} />
          )}
        </TaskContext.Consumer>
      </div>
    );
  }
}

export default Task;
