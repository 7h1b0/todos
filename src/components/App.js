import { h } from 'preact';
import { useEffect, useState, useCallback, useReducer } from 'preact/hooks';

import getDb from 'utils/database';
import { CATEGORIES } from 'utils/categories';
import { groupBy } from 'utils/utils';
import { REPLACE } from 'utils/actions';
import dispatchMiddleware from 'utils/dispatchMiddleware';
import { reduceTasks } from 'utils/reducers';

import { ModalContext, TaskContext } from 'contexts';

import AddTask from './AddTask';
import TaskList from './TaskList';
import Modal from './Modal';

async function fetchTasks(dispatch) {
  const db = await getDb();
  const event = await db('tasks').findAll();
  dispatch({ type: REPLACE, data: event.target.result });
}

const App = () => {
  const [modal, setModal] = useState(false);
  const [categoryId, setCategoryId] = useState(CATEGORIES.TODO);
  const [tasks, dispatch] = useReducer(reduceTasks, []);

  const toggleModal = useCallback(() => setModal(open => !open));
  useEffect(() => fetchTasks(dispatch), []);

  const groupedTasks = groupBy(tasks, 'categoryId');
  return (
    <ModalContext.Provider
      value={{ open: modal, toggleModal, categoryId, setCategoryId }}
    >
      <TaskContext.Provider value={dispatchMiddleware(dispatch)}>
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
    </ModalContext.Provider>
  );
};

export default App;
