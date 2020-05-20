import { h } from 'preact';
import { useEffect, useReducer } from 'preact/hooks';

import getDb from 'utils/database';
import { CATEGORIES } from 'utils/categories';
import { groupBy } from 'utils/utils';
import { ADD_ALL } from 'utils/actions';
import dispatchMiddleware from 'utils/dispatchMiddleware';
import { reduceTasks } from 'utils/reducers';

import TaskContext from 'contexts/TaskContext';

import TaskList from './TaskList';
import Export from './Export';

async function fetchTasks(dispatch) {
  const db = await getDb();
  const event = await db.findAll();
  dispatch({ type: ADD_ALL, data: event.target.result });
}

function App() {
  const [tasks, dispatch] = useReducer(reduceTasks, []);
  useEffect(() => fetchTasks(dispatch), []);

  const groupedTasks = groupBy(tasks, 'categoryId');
  return (
    <TaskContext.Provider value={dispatchMiddleware(dispatch)}>
      <Export tasks={tasks} />
      <main>
        {CATEGORIES.map(({ id, title }) => (
          <TaskList
            label={title}
            key={id}
            categoryId={id}
            tasks={groupedTasks[id] || []}
          />
        ))}
      </main>
    </TaskContext.Provider>
  );
}

export default App;
