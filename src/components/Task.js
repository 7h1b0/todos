import { h, Component } from 'preact';

import { TaskContext } from 'contexts';
import { formatDate } from 'utils/utils';
import { removeTask } from 'utils/actions';

class Task extends Component {
  state = {
    dragging: false,
  };

  shouldComponentUpdate({ title, date }, { dragging }) {
    return (
      title !== this.props.title ||
      date !== this.props.date ||
      dragging !== this.state.dragging
    );
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

  render({ title, date }, { dragging }) {
    const className = dragging ? 'task dragging' : 'task';
    return (
      <div
        class={className}
        draggable
        onDragStart={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <div class="content">
          <p class="title">{title}</p>
          <p class="caption">Added on: {formatDate(date)}</p>
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
