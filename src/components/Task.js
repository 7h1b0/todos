import { h } from 'preact';

import { useTaskDispatch } from 'contexts/TaskContext';
import { formatDate } from 'utils/utils';
import { removeTask } from 'utils/actions';

function Task(props) {
  const { date, updatedAt } = props;
  const dispatch = useTaskDispatch();
  const updatedLabel =
    updatedAt !== date ? ` / Updated on ${formatDate(updatedAt)}` : '';

  function handleDrag(e) {
    e.dataTransfer.setData('task', JSON.stringify(props));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }

  function handleRemove() {
    dispatch(removeTask(props.id));
  }

  return (
    <div class="task" draggable onDragStart={handleDrag}>
      <div class="content">
        <p class="title">{props.title}</p>
        <p class="caption">
          Created on: {formatDate(date)}
          {updatedLabel}
        </p>
      </div>
      <button
        class="delete"
        onClick={handleRemove}
        aria-label={`Remove ${props.title}`}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          alt="Remove"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
    </div>
  );
}

export default Task;
