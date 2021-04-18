import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { addTask } from 'utils/actions';

function AddTask({ categoryId, onClose }) {
  const dispatch = useTaskDispatch();
  const input = useRef(null);

  function handleSubmit() {
    onClose();
    dispatch(addTask(input.current.value, categoryId));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={input} type="text" placeholder="Enter task label" />
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
