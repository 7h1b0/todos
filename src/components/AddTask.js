import { h } from 'preact';
import { useState } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { useModal } from 'contexts/ModalContext';
import { addTask } from 'utils/actions';

function AddTask() {
  const { closeModal, payload } = useModal();
  const dispatch = useTaskDispatch();
  const [title, setTitle] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(addTask(title, payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Label
        <input
          name="add"
          type="text"
          onInput={(e) => setTitle(e.target.value)}
          placeholder="Enter task label"
          value={title}
        />
      </label>
      <button class="submit" type="submit">
        ADD TASK
      </button>
    </form>
  );
}

export default AddTask;
