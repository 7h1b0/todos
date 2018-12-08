import { h, Component } from 'preact';
import getDb from 'utils/database';
import { STATUS } from 'utils/status';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

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

function updateTodo(todo, insertAt) {
  return ({ todos }) => ({
    todos: [...todos.slice(0, insertAt), todo, ...todos.slice(insertAt + 1)],
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

  handleDragStart = id => () => {
    event.dataTransfer.setData('dragContent', JSON.stringify({ id }));
  };

  handleDragOver = id => e => {
    e.preventDefault();
    return false;
  };

  handleDrop = categoryId => async e => {
    e.preventDefault();

    const { id: targetId } = JSON.parse(
      event.dataTransfer.getData('dragContent'),
    );

    const { todos } = this.state;
    const indedTargetTodo = todos.findIndex(({ id }) => id === targetId);
    if (~indedTargetTodo) {
      const targetToto = todos[indedTargetTodo];
      const updatedToto = { ...targetToto, category: categoryId };
      this.setState(updateTodo(updatedToto, indedTargetTodo));
      await this.db.edit(updatedToto);
    }
    return false;
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
              id={id}
              todos={groupedTodos[id] || []}
              onDelete={this.handleDelete}
              onDragStart={this.handleDragStart}
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
            />
          ))}
        </div>
      </div>
    );
  }
}
