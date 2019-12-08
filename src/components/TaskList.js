import { h, Component } from 'preact';

import ModalContext from 'contexts/ModalContext';
import TaskContext from 'contexts/TaskContext';
import Task from './Task';
import { updateTask } from 'utils/actions';
import { sortByUpdated } from 'utils/utils';

class TaskList extends Component {
  section = null;
  state = {
    over: false,
  };

  setSectionRef = el => {
    this.section = el;
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ over: true });
    return false;
  };

  handleDragLeave = e => {
    if (!this.section.contains(e.fromElement)) {
      this.setState({ over: false });
    }
  };

  handleDragDrop = dispatch => e => {
    e.preventDefault();

    const task = JSON.parse(e.dataTransfer.getData('task'));
    this.setState({ over: false });
    dispatch(
      updateTask({
        ...task,
        categoryId: this.props.categoryId,
        updatedAt: Date.now(),
      }),
    );
  };

  handleAdd = openModal => () => {
    const { categoryId } = this.props;
    openModal(categoryId);
  };

  shouldComponentUpdate({ tasks }, { over }) {
    return over !== this.state.over || tasks.length !== this.props.tasks.length;
  }

  render({ label, tasks }, { over }) {
    return (
      <TaskContext.Consumer>
        {dispatch => (
          <section
            ref={this.setSectionRef}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDragDrop(dispatch)}
            class={over && 'over'}
          >
            <div class="tasks-header">
              <h2>{label}</h2>
              <ModalContext.Consumer>
                {({ openModal }) => (
                  <button
                    class="add"
                    onClick={this.handleAdd(openModal)}
                    aria-label={`Add ${label} todo`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                    </svg>
                  </button>
                )}
              </ModalContext.Consumer>
            </div>
            {tasks.sort(sortByUpdated).map(task => (
              <Task key={task.id} {...task} />
            ))}
          </section>
        )}
      </TaskContext.Consumer>
    );
  }
}

export default TaskList;
