import { h } from 'preact';
import { useState } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { addTask } from 'utils/actions';

function AddTask({ categoryId, onClose }) {
  const dispatch = useTaskDispatch();
  const [label, setLabel] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTask(label, categoryId));
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onInput={(e) => setLabel(e.target.value)}
        placeholder="Enter task label"
        value={label}
      />
      <div class="buttons">
        <button class="flat" type="button" onClick={onClose}>
          Cancel
        </button>
        <button class="raise">Add task</button>
      </div>
    </form>
  );
}

export default AddTask;
