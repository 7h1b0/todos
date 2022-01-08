import { h } from 'preact';

import { useTaskDispatch } from 'contexts/TaskContext';
import { formatDate, getColorFromString } from 'utils/utils';
import { removeTask } from 'utils/actions';

function Task(props) {
  const { tags = [], updatedAt } = props;
  const dispatch = useTaskDispatch();

  function handleDrag(e) {
    e.dataTransfer.setData('task', JSON.stringify(props));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }

  function handleRemove() {
    dispatch(removeTask(props.id));
  }

  return (
    <article
      class="task"
      draggable
      onDragStart={handleDrag}
      aria-labelledby={props.id}
    >
      <h2 id={props.id} class="title">
        {props.title}
      </h2>
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
      <ul class="tags">
        {tags.map((tag) => {
          const color = getColorFromString(tag);
          return (
            <li class="tag" style={{ backgroundColor: color }} key={tag}>
              {tag}
            </li>
          );
        })}
      </ul>
      <p class="caption">Last update: {formatDate(updatedAt)}</p>
    </article>
  );
}

export default Task;
