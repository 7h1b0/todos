<script>
  export let id;
  export let title;
  export let tags;
  export let date;
  export let updatedAt;
  export let categoryId;

  import { formatDate, getColorFromString } from '../utils/utils';
  import { removeTask } from '../utils/actions';
  import dispatch from '../stores';

  function handleDrag(e) {
    e.dataTransfer.setData(
      'task',
      JSON.stringify({ id, title, updatedAt, tags, date, categoryId }),
    );
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }

  function handleRemove() {
    dispatch(removeTask(id));
  }
</script>

<article
  class="task"
  draggable="true"
  aria-labelledby={id}
  on:dragstart={handleDrag}
>
  <h2 {id} class="title">
    {title}
  </h2>
  <button
    class="delete"
    on:click={handleRemove}
    aria-label={`Remove ${title}`}
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
    {#each tags as tag}
      {@const backgroundColor = getColorFromString(tag)}
      <li class="tag" style:background-color={backgroundColor}>
        {tag}
      </li>
    {/each}
  </ul>
  <p class="caption">Last update: {formatDate(updatedAt)}</p>
</article>
