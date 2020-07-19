import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import Task from './Task';
import AddTask from './AddTask';
import { updateTask } from 'utils/actions';
import { sortByUpdated } from 'utils/utils';

function TaskList({ label, categoryId, tasks }) {
  const dispatch = useTaskDispatch();
  const section = useRef(null);
  const [over, setOver] = useState(false);
  const [showForm, setFormVisibility] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setOver(true);
    return false;
  }

  function handleDragLeave(e) {
    if (!section.current.contains(e.fromElement)) {
      setOver(false);
    }
  }

  function handleDragDrop(e) {
    e.preventDefault();

    const task = JSON.parse(e.dataTransfer.getData('task'));
    setOver(false);
    dispatch(
      updateTask({
        ...task,
        categoryId: categoryId,
        updatedAt: Date.now(),
      }),
    );
  }

  return (
    <section
      ref={section}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      class={over && 'over'}
    >
      <div class="tasks-header">
        <h2>{label}</h2>
      </div>
      {showForm ? (
        <AddTask
          categoryId={categoryId}
          onClose={() => setFormVisibility(false)}
        />
      ) : (
        <button
          class="add"
          onClick={() => setFormVisibility(true)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
          </svg>
          {`Add ${label} task`}
        </button>
      )}

      {tasks.sort(sortByUpdated).map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </section>
  );
}

export default TaskList;
