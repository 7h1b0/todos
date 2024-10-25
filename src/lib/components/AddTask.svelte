<script>
  import { stringToArray } from '../utils/utils.js';
  import { tasksStore } from '../stores/tasks.js';

  /** @type {{ categoryId: string, onClose: () => void }} */
  let { categoryId, onClose } = $props();

  let value = $state('');
  let tags = $state('');

  function handleSubmit(e) {
    e.preventDefault();

    const now = Date.now();
    tasksStore.add({
      id: now,
      title: value,
      categoryId,
      tags: stringToArray(tags),
      date: now,
      updatedAt: now,
    });
    onClose();
  }
</script>

<form onsubmit={handleSubmit}>
  <label>
    Title
    <input type="text" placeholder="Enter task title" bind:value />
  </label>
  <label>
    Tags
    <input
      type="text"
      placeholder="Enter tags separated by comma"
      bind:value={tags}
    />
  </label>
  <div>
    <button type="button" onclick={onClose}>Cancel</button>
    <button type="submit">Add task</button>
  </div>
</form>

<style>
  input {
    display: block;
    inline-size: 100%;
    padding: var(--space-2);
    margin-block-start: calc(var(--space-1) / 2);
    background: var(--color-input);
    color: var(--color-text);
    border-radius: var(--border-radius);
    border: none;
    outline: none;
  }
  input:focus {
    outline: var(--color-accent-200) solid 2px;
  }

  div {
    display: flex;
    place-content: flex-end;
    padding-block: var(--space-2);
    padding-inline: 0;
  }

  [type='button'] {
    color: var(--color-accent-200);
    font-size: var(--fontSize-text);
    margin-inline-end: var(--space-2);
  }

  [type='button']:hover {
    color: var(--color-accent-100);
  }

  [type='submit'] {
    color: var(--color-bg);
    background: var(--color-accent-200);
    padding-block: var(--space-1);
    padding-inline: var(--space-2);
    font-size: var(--fontSize-text);
    border-radius: var(--border-radius);
  }

  [type='submit']:hover {
    background: var(--color-accent-300);
  }
</style>
