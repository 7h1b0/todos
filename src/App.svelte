<script>
  import Header from './lib/components/Header.svelte';
  import TaskList from './lib/components/TaskList.svelte';
  import Footer from './lib/components/Footer.svelte';
  import { CATEGORIES } from './lib/utils/categories';
  import { groupedFilteredTasks, progress } from './lib/stores/tasks';
</script>

<div style="--progress: {$progress}">
  <Header />
  <main>
    {#each CATEGORIES as category}
      <TaskList
        label={category.title}
        categoryId={category.id}
        tasks={$groupedFilteredTasks[category.id] || []}
      />
    {/each}
  </main>
  <Footer />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    justify-items: stretch;
    gap: var(--space-4);
    min-block-size: 100vh;
    inline-size: 100%;
    max-inline-size: 1400px;
    margin-inline: auto;
    padding-block-start: var(--space-4);
  }

  div::before {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    inline-size: var(--progress);
    content: '';
    block-size: 3px;
    background: var(--color-accent);
    transition: inline-size 0.3s linear;
  }

  main {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
  }
</style>
