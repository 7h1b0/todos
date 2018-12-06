import { h, Component } from 'preact';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import getDb from '../database';
import { STATUS } from '../status';

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

function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );
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

  handleSubmit = async ({ title, date, category }) => {
    const caption = formatDate(date);
    const todo = { title, caption, category };
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
    const groupedTodos = groupBy(todos, 'category');
    return (
      <div>
        <header>
          <AddTodo
            title="Add todo"
            autoFocus={true}
            onSubmit={this.handleSubmit}
          />
        </header>
        <div class="wrapper">
          {STATUS.map(({ id, label }) => (
            <TodoList
              label={label}
              key={id}
              todos={groupedTodos[id] || []}
              onDelete={this.handleDelete(id)}
            />
          ))}
        </div>
      </div>
    );
  }
}
