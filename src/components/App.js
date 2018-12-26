import { h, Component } from 'preact';
import getDb from 'utils/database';
import { removeTodo, addTodo, updateTodo } from 'utils/action';
import { groupBy } from 'utils/utils';
import { STATUS, TODO } from 'utils/status';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Modal from './Modal';

export default class App extends Component {
  state = {
    todos: [],
    modal: false,
    categoryId: TODO.id,
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
    this.handleClose();
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

  handleAdd = categoryId => () => {
    this.setState({ modal: true, categoryId });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  render(_, { todos, modal, categoryId }) {
    const groupedTodos = groupBy(todos, 'category');
    return (
      <div class="app">
        <header />
        <div class="wrapper">
          {STATUS.map(({ id, label }) => (
            <TodoList
              label={label}
              key={id}
              id={id}
              todos={groupedTodos[id] || []}
              onDelete={this.handleDelete}
              onDrop={this.handleDrop}
              onAdd={this.handleAdd}
            />
          ))}
        </div>
        <Modal open={modal} title="Add todo" onClose={this.handleClose}>
          <AddTodo onSubmit={this.handleSubmit} categoryId={categoryId} />
        </Modal>
      </div>
    );
  }
}
