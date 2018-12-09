import { h, Component } from 'preact';
import Todo from './Todo';

export default class TodoList extends Component {
  shouldComponentUpdate({ label, todos }) {
    return todos.length !== this.props.todos.length;
  }

  render({ id, label, todos, onDelete, onDragStart, onDragOver, onDrop }) {
    return (
      <section onDragOver={onDragOver(id)} onDrop={onDrop(id)}>
        <div class="title-header">
          <div class="counter">{todos.length}</div>
          <h2>{label}</h2>
        </div>
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
