<script>
  export let label;
  export let categoryId;
  export let tasks;

  import Task from './Task.svelte';
  import AddTask from './AddTask.svelte';
  import { updateTask } from '../utils/actions';
  import { sortByUpdated } from '../utils/utils';
  import dispatch from '../stores';

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
    dispatch(
      updateTask({
        ...task,
        categoryId,
        updatedAt: Date.now(),
      }),
    );
  }
</script>

<section
  aria-labelledby={categoryId}
  class:over
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDragDrop}
>
  <div class="header">
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
        class="add"
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
