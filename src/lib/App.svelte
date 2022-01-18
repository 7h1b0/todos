<script>
  import TaskList from './TaskList.svelte';
  import Export from './Export.svelte';
  import { CATEGORIES } from '../utils/categories';
  import { groupedTasks } from '../stores';
</script>

<Export />
<main>
  {#each CATEGORIES as category}
    <TaskList
      label={category.title}
      categoryId={category.id}
      tasks={$groupedTasks[category.id] || []}
    />
  {/each}
</main>
