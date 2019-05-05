import { h, Component } from 'preact';

import { ModalContext, TaskContext } from 'contexts';
import Task from './Task';

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

    const { id: targetId } = JSON.parse(e.dataTransfer.getData('taskId'));
    this.setState({ over: false });
    dispatch({
      type: 'UPDATE',
      data: { targetId, targetStatusId: this.props.id },
    });
  };

  handleAdd = (openModal, setStatusId) => () => {
    const { id } = this.props;
    setStatusId(id);
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
              {({ toggleModal, setStatusId }) => (
                <button
                  onClick={this.handleAdd(toggleModal, setStatusId)}
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
