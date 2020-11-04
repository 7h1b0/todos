import { h } from 'preact';

import { useTaskDispatch } from 'contexts/TaskContext';
import { addAll } from 'utils/actions';

function Export({ tasks }) {
  const dispatch = useTaskDispatch();

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
        dispatch(addAll(data));
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <header>
      <button class="export" onClick={handleExport} type="button">
        Export
      </button>
      <label class="export">
        Import
        <input class="hidden" onInput={handleImport} type="file" />
      </label>
    </header>
  );
}

export default Export;
