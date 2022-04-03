<script>
  export let id;
  export let title;
  export let tags;
  export let date;
  export let updatedAt;
  export let categoryId;

  import { formatDate, getColorFromString } from '../utils/utils';
  import { removeTask } from '../utils/actions';
  import dispatch from '../stores/tasks';

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
  <h2 {id}>
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

<style>
  h2 {
    font-size: 1rem;
  }
  .task {
    cursor: grab;
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-s);
    background: var(--color-task);
    align-items: center;
    border: 2px solid var(--color-task);
    border-radius: var(--border-radius);
    padding: var(--space-m);
    transition: border 0.3s ease-in-out;
  }
  .task:hover {
    border: 2px solid var(--color-accent);
  }
  .delete {
    grid-row-end: span 3;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: var(--color-accent);
    width: 24px;
    height: 24px;
  }

  .delete:focus,
  .task:hover .delete {
    opacity: 1;
  }

  .tags {
    list-style-type: none;
    display: flex;
    gap: var(--space-s);
    flex-wrap: wrap;
  }
  .tag {
    padding: 4px;
    border-radius: var(--border-radius);
    color: var(--color-bg);
  }
</style>
