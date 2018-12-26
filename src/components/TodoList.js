import { h, Component } from 'preact';
import Todo from './Todo';

export default class TodoList extends Component {
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

  shouldComponentUpdate({ todos }, { over }) {
    return over !== this.state.over || todos.length !== this.props.todos.length;
  }

  render({ label, todos, onDelete, onDrop, onAdd, id }, { over }) {
    return (
      <section
        ref={this.setSectionRef}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDragDrop}
        class={over && 'over'}
      >
        <div class="title-header">
          <div class="counter">{todos.length}</div>
          <h2>{label}</h2>
        </div>
        {todos.map(todo => (
          <Todo key={todo.id} onDelete={onDelete} {...todo} />
        ))}
        <button onClick={onAdd(id)} class="add" />
      </section>
    );
  }
}
