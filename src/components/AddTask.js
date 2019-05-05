import { h } from 'preact';
import { useEffect, useState, useRef, useContext } from 'preact/hooks';

import { ModalContext, TaskContext } from 'contexts';

const AddTask = () => {
  const { toggleModal, statusId } = useContext(ModalContext);
  const dispatch = useContext(TaskContext);
  const [value, setValue] = useState(null);

  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current != null) {
      inputEl.current.focus();
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    toggleModal();
    setValue(null);
    dispatch({
      type: 'ADD',
      data: { title: value, date: Date.now(), statusId },
    });
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
          value={value}
          onChange={e => setValue(e.target.value)}
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
