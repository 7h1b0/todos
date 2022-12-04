<script>
  export let label;
  export let categoryId;
  export let tasks;

  import Task from './Task.svelte';
  import AddTask from './AddTask.svelte';
  import { sortByUpdated } from '../utils/utils';
  import { tasksStore } from '../stores/tasks';

  let showForm = false;
  let over = false;
  $: sortedTasks = tasks.sort(sortByUpdated);

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
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDragDrop}
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
        on:click={() => {
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

  {#each sortedTasks as task}
    <Task {...task} />
  {/each}
</section>

<style>
  section {
    flex: 1;
    display: flex;
    gap: var(--space-s);
    flex-direction: column;
    border: 2px solid var(--color-task);
    padding: var(--space-m);
    border-radius: var(--border-radius);
  }

  h1 {
    font-size: 1.05rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    margin: var(--space-m) 0;
  }

  .over {
    border: 2px solid var(--color-accent);
  }

  button {
    display: flex;
    place-content: center;
    align-items: center;
    padding: var(--space-s) var(--space-m);
    color: var(--color-caption);
    background: var(--color-task);
    border-radius: var(--border-radius);
    fill: var(--color-caption);
  }
  button svg {
    padding-right: var(--space-s);
  }
  button:hover {
    color: var(--color-accent);
    fill: var(--color-accent);
  }
</style>
