<script>
  export let categoryId;
  export let onClose;

  import { stringToArray } from '../utils/utils';
  import { tasksStore } from '../stores/tasks';

  let value = '';
  let tags = '';

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

<form on:submit={handleSubmit}>
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
    <button type="button" on:click={onClose}>Cancel</button>
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
    outline: var(--color-accent) solid 2px;
  }

  div {
    display: flex;
    place-content: flex-end;
    padding-block: var(--space-2);
    padding-inline: 0;
  }

  [type='button'] {
    color: var(--color-accent);
    font-size: var(--caption);
    margin-inline-end: var(--space-2);
  }

  [type='submit'] {
    color: white;
    background: var(--color-accent);
    padding-block: var(--space-1);
    padding-inline: var(--space-2);
    font-size: var(--caption);
    border-radius: var(--border-radius);
  }
</style>
