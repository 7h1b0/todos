<script>
  import { search } from '../stores/search';
</script>

<header>
  <h1>Board</h1>
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
    inline-size: 100%;
    max-inline-size: 1400px;
    margin-inline: auto;
    margin-block: 0;
  }

  h1 {
    font-size: 2rem;
  }

  input {
    display: block;
    inline-size: 100%;
    padding-block: var(--space-m);
    padding-inline: 36px var(--space-s);
    margin-block-start: calc(var(--space-s) / 2);
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
