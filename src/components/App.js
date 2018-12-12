import { h, Component } from 'preact';
import getDb from 'utils/database';
import { removeTodo, addTodo, updateTodo } from 'utils/action';
import { groupBy } from 'utils/utils';
import { STATUS } from 'utils/status';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

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
    } catch (error) {}
  }

  handleSubmit = async ({ title, date, category }) => {
    const todo = { title, date, category };
    try {
      const res = await this.db.add(todo);
      todo.id = res.target.result;
      this.setState(addTodo(todo));
    } catch (error) {}
  };

  handleDelete = id => async () => {
    await this.db.remove(id);
    this.setState(removeTodo(id));
  };

  handleDrop = async (e, categoryId) => {
    e.preventDefault();

    try {
      const { id: targetId } = JSON.parse(e.dataTransfer.getData('todoId'));

      const { todos } = this.state;
      const indedTargetTodo = todos.findIndex(({ id }) => id === targetId);
      if (~indedTargetTodo) {
        const targetToto = todos[indedTargetTodo];
        const updatedToto = { ...targetToto, category: categoryId };
        this.setState(updateTodo(updatedToto, indedTargetTodo));
        await this.db.edit(updatedToto);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render(_, { todos }) {
    const groupedTodos = groupBy(todos, 'category');
    return (
      <div class="app">
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
              onDrop={this.handleDrop}
            />
          ))}
        </div>
      </div>
    );
  }
}
