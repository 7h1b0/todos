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

  handleAdd = (openModal, setCategoryId) => () => {
    const { categoryId } = this.props;
    setCategoryId(categoryId);
    openModal();
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
            <div class="title-header">
              <div class="counter">{tasks.length}</div>
              <h2>{label}</h2>
            </div>
            {tasks.sort(sortByUpdated).map(task => (
              <Task key={task.id} {...task} />
            ))}
            <ModalContext.Consumer>
              {({ openModal, setCategoryId }) => (
                <button
                  onClick={this.handleAdd(openModal, setCategoryId)}
                  class="add"
                  aria-label={`Add ${label} todo`}
                />
              )}
            </ModalContext.Consumer>
          </section>
        )}
      </TaskContext.Consumer>
    );
  }
}

export default TaskList;
