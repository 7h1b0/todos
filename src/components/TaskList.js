import { h, Component } from 'preact';
import Task from './Task';

export default class TaskList extends Component {
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
    const { onDrop, id } = this.props;
    this.setState({ over: false });
    onDrop(e, id);
  };

  shouldComponentUpdate({ tasks }, { over }) {
    return over !== this.state.over || tasks.length !== this.props.tasks.length;
  }

  render({ label, tasks, onDelete, onDrop, onAdd, id }, { over }) {
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
          <Task key={task.id} onDelete={onDelete} {...task} />
        ))}
        <button onClick={onAdd(id)} class="add" aria-label="Add task" />
      </section>
    );
  }
}
