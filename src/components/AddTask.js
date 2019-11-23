import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import { useTaskDispatch } from 'contexts/TaskContext';
import { useModal } from 'contexts/ModalContext';
import { addTask } from 'utils/actions';

const AddTask = () => {
  const { closeModal, payload } = useModal();
  const dispatch = useTaskDispatch();
  const [title, setTitle] = useState(null);

  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current != null) {
      inputEl.current.focus();
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    closeModal();
    dispatch(addTask(title, payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="add">
        Task Label
        <input
          ref={inputEl}
          id="add"
          name="add"
          type="text"
          value={title}
          onInput={e => setTitle(e.target.value)}
          placeholder="Enter task label"
        />
      </label>
      <button class="submit" type="submit">
        ADD TASK
      </button>
    </form>
  );
};

export default AddTask;
