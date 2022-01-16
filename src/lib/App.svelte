<script>
  import { onDestroy, onMount } from 'svelte';
  import TaskList from './TaskList.svelte';
  import Export from './Export.svelte';
  import { CATEGORIES } from '../utils/categories';
  import { groupBy } from '../utils/utils';
  import getDb from '../utils/database';
  import { tasksStore } from '../stores';

  let tasks = [];
  const unsubscribe = tasksStore.subscribe((state) => {
    tasks = state;
  });

  onMount(async () => {
    const db = await getDb();
    const event = await db.findAll();
    tasksStore.set(event.target.result);
  });

  $: groupedTasks = groupBy(tasks, 'categoryId');

  onDestroy(unsubscribe);
</script>

<Export {tasks} />
<main>
  {#each CATEGORIES as category}
    <TaskList
      label={category.title}
      categoryId={category.id}
      tasks={groupedTasks[category.id] || []}
    />
  {/each}
</main>
