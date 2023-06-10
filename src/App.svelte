<script>
  import TaskList from './lib/components/TaskList.svelte';
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import { CATEGORIES } from './lib/utils/categories';
  import { groupedFilteredTasks } from './lib/stores/tasks';
</script>

<div>
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
    gap: var(--space-m) 32px;
    min-block-size: 100vh;
  }

  main {
    grid-row: 2;
    inline-size: 100%;
    max-inline-size: 1400px;
    margin-inline: auto;
    margin-block: 0 2rem;
    display: flex;
    align-items: flex-start;
    gap: 32px;
  }
</style>
