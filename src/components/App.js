import { h } from 'preact';
import { useEffect, useReducer } from 'preact/hooks';

import getDb from 'utils/database';
import { CATEGORIES } from 'utils/categories';
import { groupBy } from 'utils/utils';
import { ADD_ALL } from 'utils/actions';
import dispatchMiddleware from 'utils/dispatchMiddleware';
import { reduceTasks } from 'utils/reducers';

import TaskContext from 'contexts/TaskContext';
import { ModalProvider } from 'contexts/ModalContext';

import AddTask from './AddTask';
import TaskList from './TaskList';
import Modal from './Modal';
import Export from './Export';

async function fetchTasks(dispatch) {
  const db = await getDb();
  const event = await db('tasks').findAll();
  dispatch({ type: ADD_ALL, data: event.target.result });
}

const App = () => {
  const [tasks, dispatch] = useReducer(reduceTasks, []);
  useEffect(() => fetchTasks(dispatch), []);

  const groupedTasks = groupBy(tasks, 'categoryId');
  return (
    <ModalProvider>
      <TaskContext.Provider value={dispatchMiddleware(dispatch)}>
        <Export tasks={tasks} />
        <div class="wrapper">
          {CATEGORIES.map(({ id, title }) => (
            <TaskList
              label={title}
              key={id}
              categoryId={id}
              tasks={groupedTasks[id] || []}
            />
          ))}
        </div>
        <Modal>
          <AddTask />
        </Modal>
      </TaskContext.Provider>
    </ModalProvider>
  );
};

export default App;
