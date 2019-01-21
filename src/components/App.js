import { h, Component } from 'preact';
import getDb from 'utils/database';
import { connect } from 'unistore/preact';
import { STATUSES } from 'utils/status';
import { groupBy } from 'utils/utils';
import AddTask from './AddTask';
import TaskList from './TaskList';
import Modal from './Modal';

class App extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render({ tasks }, { statusId, statuses }) {
    const groupedTasks = groupBy(tasks, 'statusId');
    return (
      <div>
        <div class="wrapper">
          {STATUSES.map(({ id, title }) => (
            <TaskList
              label={title}
              key={id}
              id={id}
              tasks={groupedTasks[id] || []}
            />
          ))}
        </div>
        <Modal>
          <AddTask />
        </Modal>
      </div>
    );
  }
}

const actions = {
  fetchTasks: async () => {
    const db = await getDb();
    const event = await db('tasks').findAll();
    return { db, tasks: event.target.result };
  },
};

export default connect(
  'tasks',
  actions,
)(App);
