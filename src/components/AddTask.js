import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { addTask } from 'utils/actions';
import { stringToArray } from 'utils/utils';

function AddTask({ categoryId, onClose }) {
  const dispatch = useTaskDispatch();
  const titleRef = useRef(null);
  const tagsRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    const tags = stringToArray(tagsRef.current.value);
    dispatch(addTask(titleRef.current.value, categoryId, tags));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" placeholder="Enter task label" />
      <input
        ref={tagsRef}
        type="text"
        placeholder="Enter tags separated by comma"
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
