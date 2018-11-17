import { h, Component } from 'preact';
import Todo from './Todo';
import AddTodo from './AddTodo';
import getDb from '../database';

function formatDate(timestamp) {
  const dt = new Date(timestamp);
  return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
}

function removeTodo(idToRemoved) {
  return ({ todos }) => ({
    todos: todos.filter(({ id }) => id !== idToRemoved),
  });
}

function addTodo(todo) {
  return ({ todos }) => ({
    todos: todos.concat([todo]),
  });
}

export default class App extends Component {
  state = {
    todos: [],
  };
  db = null;

  async componentDidMount() {
    try {
      this.db = await getDb();
      const res = await this.db.findAll();
      this.setState({ todos: res.target.result });
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit = async ({ title, date }) => {
    const caption = formatDate(date);
    const todo = { title, caption };
    try {
      const res = await this.db.add(todo);
      todo.id = res.target.result;
      this.setState(addTodo(todo));
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = id => async () => {
    await this.db.remove(id);
    this.setState(removeTodo(id));
  };

  render(_, { todos }) {
    return (
      <div>
        <header>
          <AddTodo
            title="Add todo"
            autoFocus={true}
            onSubmit={this.handleSubmit}
          />
        </header>
        {todos.map(({ title, caption, id }) => (
          <Todo
            key={id}
            title={title}
            caption={caption}
            onDelete={this.handleDelete(id)}
          />
        ))}
      </div>
    );
  }
}
