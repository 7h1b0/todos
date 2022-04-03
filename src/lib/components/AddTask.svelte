<script>
  export let categoryId;
  export let onClose;

  import { stringToArray } from '../utils/utils';
  import dispatch from '../stores/tasks';
  import { addTask } from '../utils/actions';

  let title = '';
  let tags = '';

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    const tagsList = stringToArray(tags);
    dispatch(addTask(title, categoryId, tagsList));
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    Title
    <input type="text" placeholder="Enter task title" bind:value={title} />
  </label>
  <label>
    Tags
    <input
      type="text"
      placeholder="Enter tags separated by comma"
      bind:value={tags}
    />
  </label>
  <div class="buttons">
    <button class="flat" type="button" on:click={onClose}>Cancel</button>
    <button class="raise">Add task</button>
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
</style>
