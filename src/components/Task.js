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
            <button
              class="delete"
              onClick={this.handleRemove(dispatch)}
              aria-label="Remove task"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                alt="Remove"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          )}
        </TaskContext.Consumer>
      </div>
    );
  }
}

export default Task;
