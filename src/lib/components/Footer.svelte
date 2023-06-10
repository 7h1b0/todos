<script lang="ts">
  import { tasksStore } from '../stores/tasks';

  function handleExport() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ tasks: $tasksStore }));
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
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  }
</script>

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

<style>
  footer {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
  }

  .export {
    display: flex;
    align-items: center;
    gap: var(--space-1);
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
