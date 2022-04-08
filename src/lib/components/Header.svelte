<script>
  import { set } from '../utils/actions';
  import dispatch, { tasks } from '../stores/tasks';
  import { search } from '../stores/search';

  function handleExport() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify($tasks));
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
        const data = JSON.parse(event.target.result);
        dispatch(set(data));
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  }

  function handleInput(event) {
    search.update(() => event.target.value);
  }
</script>

<header>
  <label>
    <span class="hidden">Search Tags</span>
    <input type="search" placeholder="Search tags" on:input={handleInput} />
  </label>
  <button
    class="export start-3"
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
    </svg></button
  >
  <label class="export">
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
    <span class="hidden">Import</span>
    <input class="hidden" on:input={handleImport} type="file" />
  </label>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto var(--space-m);
  }

  .start-3 {
    grid-column-start: 3;
  }

  .export {
    cursor: pointer;
    margin: var(--space-m);
    color: var(--color-caption);
    font-size: var(--caption);
  }
  .export:hover {
    color: var(--color-accent);
    fill: var(--color-accent);
  }

  [type='search'] {
    display: block;
    width: 100%;
    padding: var(--space-m) var(--space-s) var(--space-m) 36px;
    margin-top: calc(var(--space-s) / 2);
    background: var(--color-task) url('./search.svg') 8px center / 20px
      no-repeat;
    color: var(--color-text);
    border-radius: var(--border-radius);
    border: none;
    outline: none;
  }
  [type='search']:focus {
    outline: var(--color-accent) solid 2px;
  }

  .hidden {
    display: none;
  }
</style>
