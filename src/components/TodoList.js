import { h, Component } from 'preact';
import Todo from './Todo';

export default class TodoList extends Component {
  state = {
    over: false,
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ over: true });
    return false;
  };

  handleDragLeave = () => {
    this.setState({ over: false });
  };

  handleDragDrop = e => {
    const { onDrop, id } = this.props;
    this.handleDragLeave();
    onDrop(e, id);
  };

  shouldComponentUpdate({ todos }, { over }) {
    return over !== this.state.over || todos.length !== this.props.todos.length;
  }

  render({ label, todos, onDelete, onDrop }, { over }) {
    return (
      <section
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
      </section>
    );
  }
}
