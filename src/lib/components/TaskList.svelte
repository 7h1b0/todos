<script>
  /** @type {{ label: string,categoryId: string, tasks: unknown[] }} */
  let { label, categoryId, tasks } = $props();

  import Task from './Task.svelte';
  import AddTask from './AddTask.svelte';
  import { sortByUpdated } from '../utils/utils.js';
  import { tasksStore } from '../stores/tasks.js';

  let showForm = $state(false);
  let over = $state(false);

  function handleDragOver(e) {
    e.preventDefault();
    over = true;
  }

  function handleDragLeave() {
    over = false;
  }

  function handleDragDrop(e) {
    e.preventDefault();
    over = false;

    const task = JSON.parse(e.dataTransfer.getData('task'));
    tasksStore.update({
      ...task,
      categoryId,
      updatedAt: Date.now(),
    });
  }
</script>

<section
  aria-labelledby={categoryId}
  class:over
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDragDrop}
>
  <div>
    <h1 id={categoryId}>{label}</h1>
    {#if showForm}
      <AddTask
        {categoryId}
        onClose={() => {
          showForm = false;
        }}
      />
    {:else}
      <button
        type="button"
        onclick={() => {
          showForm = true;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
          />
        </svg>
        Add {label} task
      </button>
    {/if}
  </div>

  {#each tasks.toSorted(sortByUpdated) as task}
    <Task {...task} />
  {/each}
</section>

<style>
  section {
    flex: 1;
    display: flex;
    width: 100%;
    gap: var(--space-1);
    flex-direction: column;
    border: 2px solid var(--color-task);
    padding: var(--space-2);
    border-radius: var(--border-radius);
  }

  h1 {
    font-size: var(--fontSize-header);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-block: var(--space-2);
    margin-inline: 0;
  }

  .over {
    border: 2px solid var(--color-accent-200);
  }

  button {
    display: flex;
    place-content: center;
    align-items: center;
    padding-block: var(--space-1);
    padding-inline: var(--space-2);
    color: var(--color-caption);
    background: var(--color-task);
    border-radius: var(--border-radius);
    fill: var(--color-caption);
    font-size: var(--fontSize-caption);
  }
  button svg {
    padding-inline-end: var(--space-1);
  }
  button:hover {
    color: var(--color-accent-200);
    fill: var(--color-accent-200);
  }
</style>
