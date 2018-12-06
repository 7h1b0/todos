import { h, Component } from 'preact';
import Todo from './Todo';

export default class TodoList extends Component {
  shouldComponentUpdate({ label, todos }) {
    return (
      label !== this.props.label || todos.length !== this.props.todos.length
    );
  }

  render({ label, todos, handleDelete }) {
    return (
      <section>
        <h2>{label}</h2>
        {todos.map(({ title, caption, id }) => (
          <Todo
            key={id}
            title={title}
            caption={caption}
            onDelete={handleDelete}
          />
        ))}
      </section>
    );
  }
}
