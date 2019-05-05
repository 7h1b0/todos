import { h } from 'preact';
import { useEffect, useState, useCallback, useReducer } from 'preact/hooks';

import getDb from 'utils/database';
import { STATUSES } from 'utils/status';
import { groupBy } from 'utils/utils';

import { ModalContext, TaskContext } from 'contexts';

import AddTask from './AddTask';
import TaskList from './TaskList';
import Modal from './Modal';

async function fetchTasks(dispatch) {
  const db = await getDb();
  const event = await db('tasks').findAll();
  dispatch({ type: 'FETCH', data: event.target.result });
}

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'FETCH':
      return action.data;
    case 'ADD':
      return [...state, action.data];
    case 'REMOVE':
      return state.filter(({ id }) => id !== action.data);
    case 'UPDATE':
      const indedTargetTask = state.findIndex(
        ({ id }) => id === action.data.targetId,
      );
      if (~indedTargetTask) {
        const targetTask = state[indedTargetTask];
        const updatedTask = {
          ...targetTask,
          statusId: action.data.targetStatusId,
        };

        return [
          ...state.slice(0, indedTargetTask),
          updatedTask,
          ...state.slice(indedTargetTask + 1),
        ];
      }
      break;
    default:
      return state;
  }
}

const App = () => {
  const [modal, setModal] = useState(false);
  const [statusId, setStatusId] = useState(STATUSES.TODO);
  const [tasks, dispatch] = useReducer(reducer, []);

  const toggleModal = useCallback(() => setModal(open => !open));
  useEffect(() => fetchTasks(dispatch), []);

  const groupedTasks = groupBy(tasks, 'statusId');
  return (
    <ModalContext.Provider
      value={{ open: modal, toggleModal, statusId, setStatusId }}
    >
      <TaskContext.Provider value={dispatch}>
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
      </TaskContext.Provider>
    </ModalContext.Provider>
  );
};

export default App;
