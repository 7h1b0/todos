<script>
  export let onClose;

  import dispatch from '../stores/boards';
  import { addBoard } from '../utils/actions';

  let value = '';

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addBoard(value));
    onClose();
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    Title
    <input type="text" placeholder="Enter task title" bind:value />
  </label>
  <div>
    <button type="button" on:click={onClose}>Cancel</button>
    <button type="submit">Add board</button>
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
