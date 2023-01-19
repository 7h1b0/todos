<script lang="ts">
  import { tasksStore } from '../stores/tasks';
  import { boards, currentBoard, INITIAL_BOARD } from '../stores/boards';
  import AddBoard from './AddBoard.svelte';

  let showForm = false;

  function handleClose() {
    showForm = false;
  }

  function handleExport() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify({ tasks: $tasksStore, boards: $boards }),
      );
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'tasks.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleImport(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(`${event.target.result}`);
        tasksStore.set(data.tasks);
        boards.set(data.boards);
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  }
</script>

<nav>
  <header>
    {#if showForm}
      <AddBoard onClose={handleClose} />
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
        Add board
      </button>
    {/if}
  </header>
  <ul>
    {#each $boards as board}
      <li>
        <button
          aria-current={$currentBoard.id === board.id}
          on:click={() => ($currentBoard = board)}>{board.title}</button
        >
      </li>
    {/each}
  </ul>

  <footer>
    <button
      class="export"
      on:click={handleExport}
      type="button"
      aria-label="Export"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </button>
    <label class="export" aria-label="Import">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
      <input class="hidden" on:input={handleImport} type="file" />
    </label>
  </footer>
</nav>

<style>
  nav {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-m);
    width: 100%;
    grid-row: 1 /3;
    padding: var(--space-m);
    border-right: 3px solid var(--color-task);
  }

  header {
    margin: 0 var(--space-m) 0;
  }

  header button {
    background: var(--color-task);
    border-radius: var(--border-radius);
    color: var(--color-text);
    fill: var(--color-text);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-s);
    padding: var(--space-s) var(--space-m);
  }

  header button:hover {
    color: var(--color-accent);
    fill: var(--color-accent);
  }

  header svg {
    fill: inherit;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  ul button {
    text-align: start;
    width: 100%;
    padding: var(--space-m);
    border-radius: var(--border-radius);
    font-size: 1rem;
    color: var(--color-text);
  }

  ul button:hover,
  ul [aria-current='true'] {
    color: var(--color-accent);
  }

  footer {
    display: flex;
    justify-content: space-evenly;
  }

  .export {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    cursor: pointer;
    color: var(--color-caption);
    font-size: 1rem;
  }

  .export:hover {
    color: var(--color-accent);
    fill: var(--color-accent);
  }

  .hidden {
    display: none;
  }
</style>
