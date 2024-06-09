<script>
  let { id, title, tags, date, board, updatedAt, categoryId } = $props();

  import { formatDate, getColorFromString } from '../utils/utils.js';
  import { tasksStore } from '../stores/tasks.js';

  function handleDrag(e) {
    e.dataTransfer.setData(
      'task',
      JSON.stringify({ id, title, updatedAt, tags, date, categoryId, board }),
    );
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }

  function handleRemove() {
    tasksStore.remove(id);
  }
</script>

<article draggable="true" aria-labelledby={id} ondragstart={handleDrag}>
  <h2 {id}>
    {title}
  </h2>
  <button onclick={handleRemove} aria-label={`Remove ${title}`} type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <ul>
    {#each tags as tag}
      {@const backgroundColor = getColorFromString(tag)}
      <li style:background-color={backgroundColor}>
        {tag}
      </li>
    {/each}
  </ul>
  <p>Last update: {formatDate(updatedAt)}</p>
</article>

<style>
  h2 {
    font-size: var(--fontSize-header);
  }
  article {
    cursor: grab;
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-1);
    background: var(--color-task);
    align-items: center;
    border: 2px solid var(--color-task);
    border-radius: var(--border-radius);
    padding: var(--space-2);
    transition: border 0.3s ease-in-out;
  }
  article:hover {
    border: 2px solid var(--color-accent-200);
  }
  button {
    grid-row-end: span 3;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: var(--color-accent-200);
    block-size: 24px;
    inline-size: 24px;
  }

  button:focus,
  article:hover button {
    opacity: 1;
  }

  ul {
    list-style-type: none;
    display: flex;
    gap: var(--space-1);
    flex-wrap: wrap;
  }
  li {
    padding: 4px;
    border-radius: var(--border-radius);
    color: var(--color-bg);
    font-size: var(--fontSize-caption);
  }

  p {
    color: var(--color-caption);
    font-size: var(--fontSize-caption);
  }
</style>
