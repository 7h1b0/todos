import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import Task from './Task';
import { updateTask, openModal, setStatusId } from 'utils/actions';

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

  handleDragDrop = e => {
    e.preventDefault();

    const { id: targetId } = JSON.parse(e.dataTransfer.getData('taskId'));
    this.setState({ over: false });
    this.props.updateTask(targetId, this.props.id);
  };

  handleAdd = () => {
    const { openModal, id, setStatusId } = this.props;
    setStatusId(id);
    openModal();
  };

  shouldComponentUpdate({ tasks }, { over }) {
    return over !== this.state.over || tasks.length !== this.props.tasks.length;
  }

  render({ label, tasks }, { over }) {
    return (
      <section
        ref={this.setSectionRef}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDragDrop}
        class={over && 'over'}
      >
        <div class="title-header">
          <div class="counter">{tasks.length}</div>
          <h2>{label}</h2>
        </div>
        {tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
        <button onClick={this.handleAdd} class="add" aria-label="Add task" />
      </section>
    );
  }
}

export default connect(
  undefined,
  {
    openModal,
    updateTask,
    setStatusId,
  },
)(TaskList);
