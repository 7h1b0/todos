import { h, Component } from 'preact';

import ModalContext from 'contexts/ModalContext';
import TaskContext from 'contexts/TaskContext';
import Task from './Task';
import { updateTask } from 'utils/actions';

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
    dispatch(updateTask({ ...task, categoryId: this.props.categoryId }));
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
            {tasks.map(task => (
              <Task key={task.id} {...task} />
            ))}
            <ModalContext.Consumer>
              {({ toggleModal, setCategoryId }) => (
                <button
                  onClick={this.handleAdd(toggleModal, setCategoryId)}
                  class="add"
                  aria-label="Add task"
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
