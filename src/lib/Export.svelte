<script>
  export let tasks;

  import { addAll } from '../utils/actions';
  import dispatch from '../stores';

  function handleExport() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(tasks));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'tasks.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleImport(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        console.log('YOLO', data);
        dispatch(addAll(data));
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  }
</script>

<header>
  <button class="export" on:click={handleExport} type="button"> Export </button>
  <label class="export">
    Import
    <input class="hidden" on:input={handleImport} type="file" />
  </label>
</header>
