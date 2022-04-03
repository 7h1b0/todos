<script>
  import TaskList from './lib/components/TaskList.svelte';
  import Header from './lib/components/Header.svelte';
  import { CATEGORIES } from './lib/utils/categories';
  import { groupedFilteredTasks } from './lib/stores/tasks';
</script>

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
