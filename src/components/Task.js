import { h, Component } from 'preact';

import TaskContext from 'contexts/TaskContext';
import { formatDate, classNames } from 'utils/utils';
import { removeTask } from 'utils/actions';

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

  render({ title, date }, { dragging }) {
    return (
      <div
        class={classNames('task', dragging && 'dragging')}
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
