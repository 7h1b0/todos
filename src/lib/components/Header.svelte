<script>
  import { search } from '../stores/search';
  import { currentBoard } from '../stores/boards';
</script>

<header>
  <h1>{$currentBoard.title}</h1>
  <label>
    <span>Search Tags</span>
    <input type="search" placeholder="Search tags" bind:value={$search} />
  </label>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2rem;
  }

  input {
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
  input:focus {
    outline: var(--color-accent) solid 2px;
  }

  span {
    display: none;
  }
</style>
