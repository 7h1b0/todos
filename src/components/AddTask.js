import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import { useTask } from 'contexts/TaskContext';
import { useModal } from 'contexts/ModalContext';
import { addTask } from 'utils/actions';

const AddTask = () => {
  const { toggleModal, categoryId } = useModal();
  const dispatch = useTask();
  const [title, setTitle] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current != null) {
      inputEl.current.focus();
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    toggleModal();
    dispatch(addTask(title, categoryId, new Date(dueDate).getTime()));
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
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task label"
        />
      </label>
      <label for="due">
        Due Date
        <input
          id="due"
          name="due"
          type="text"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </label>
      <button class="submit" type="submit">
        ADD TASK
      </button>
    </form>
  );
};

export default AddTask;
