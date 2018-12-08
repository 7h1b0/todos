import { h, Component } from 'preact';
import Todo from './Todo';

export default class TodoList extends Component {
  shouldComponentUpdate({ label, todos }) {
    return (
      label !== this.props.label || todos.length !== this.props.todos.length
    );
  }

  render({ id, label, todos, onDelete, onDragStart, onDragOver, onDrop }) {
    return (
      <section onDragOver={onDragOver(id)} onDrop={onDrop(id)}>
        <h2>{label}</h2>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            onDelete={onDelete}
            onDragStart={onDragStart}
            {...todo}
          />
        ))}
      </section>
    );
  }
}
