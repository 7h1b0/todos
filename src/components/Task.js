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
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Task;
