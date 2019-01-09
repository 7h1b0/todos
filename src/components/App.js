import { h, Component } from 'preact';
import getDb from 'utils/database';
import { removeTask, addTask, updateTask } from 'utils/action';
import { groupBy } from 'utils/utils';
import { STATUS, TODO } from 'utils/status';
import AddTask from './AddTask';
import TaskList from './TaskList';
import Modal from './Modal';

export default class App extends Component {
  state = {
    tasks: [],
    modal: false,
    categoryId: TODO.id,
  };
  db = null;

  async componentDidMount() {
    try {
      this.db = await getDb();
      const res = await this.db('todo').findAll();
      this.setState({ tasks: res.target.result });
    } catch (error) {}
  }

  handleSubmit = async ({ title, date, category }) => {
    this.handleClose();
    const task = { title, date, category };
    try {
      const res = await this.db('todo').add(task);
      task.id = res.target.result;
      this.setState(addTask(task));
    } catch (error) {}
  };

  handleDelete = id => async () => {
    await this.db('todo').remove(id);
    this.setState(removeTask(id));
  };

  handleDrop = async (e, categoryId) => {
    e.preventDefault();

    try {
      const { id: targetId } = JSON.parse(e.dataTransfer.getData('taskId'));

      const { tasks } = this.state;
      const indedTargetTask = tasks.findIndex(({ id }) => id === targetId);
      if (~indedTargetTask) {
        const targetToto = tasks[indedTargetTask];
        const updatedToto = { ...targetToto, category: categoryId };
        this.setState(updateTask(updatedToto, indedTargetTask));
        await this.db('todo').edit(updatedToto);
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

  render(_, { tasks, modal, categoryId }) {
    const groupedTasks = groupBy(tasks, 'category');
    return (
      <div>
        <div class="wrapper">
          {STATUS.map(({ id, label }) => (
            <TaskList
              label={label}
              key={id}
              id={id}
              tasks={groupedTasks[id] || []}
              onDelete={this.handleDelete}
              onDrop={this.handleDrop}
              onAdd={this.handleAdd}
            />
          ))}
        </div>
        <Modal open={modal} onClose={this.handleClose}>
          <AddTask onSubmit={this.handleSubmit} categoryId={categoryId} />
        </Modal>
      </div>
    );
  }
}
