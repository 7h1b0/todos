import { h } from 'preact';
import { useState } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { useModal } from 'contexts/ModalContext';
import { addTask } from 'utils/actions';

function AddTask() {
  const { closeModal, payload } = useModal();
  const dispatch = useTaskDispatch();
  const [label, setLabel] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(addTask(label, payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Label
        <input
          type="text"
          onInput={(e) => setLabel(e.target.value)}
          placeholder="Enter task label"
          value={label}
        />
      </label>
      <button class="submit">ADD TASK</button>
    </form>
  );
}

export default AddTask;
