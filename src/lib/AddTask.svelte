<script>
  export let categoryId;
  export let onClose;

  import { stringToArray } from '../utils/utils';
  import dispatch from '../stores';
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
  <input
    type="text"
    placeholder="Enter task title"
    aria-label="task title"
    bind:value={title}
  />
  <input
    type="text"
    placeholder="Enter tags separated by comma"
    aria-label="tags separated by comma"
    bind:value={tags}
  />
  <div class="buttons">
    <button class="flat" type="button" on:click={onClose}>Cancel</button>
    <button class="raise">Add task</button>
  </div>
</form>
