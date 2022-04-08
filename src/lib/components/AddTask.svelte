<script>
  export let categoryId;
  export let onClose;

  import { stringToArray } from '../utils/utils';
  import dispatch from '../stores/tasks';
  import { addTask } from '../utils/actions';

  let value = '';
  let tags = '';

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    const tagsList = stringToArray(tags);
    dispatch(addTask(value, categoryId, tagsList));
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
    width: 100%;
    padding: var(--space-m);
    margin-top: calc(var(--space-s) / 2);
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
    padding: var(--space-m) 0;
  }

  [type='button'] {
    color: var(--color-accent);
    font-size: var(--caption);
    margin-right: var(--space-m);
  }

  [type='submit'] {
    color: white;
    background: var(--color-accent);
    padding: var(--space-s) var(--space-m);
    font-size: var(--caption);
    border-radius: var(--border-radius);
  }
</style>
