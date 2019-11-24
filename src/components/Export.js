import { h } from 'preact';
import { ADD_ALL } from 'utils/actions';
import { useTaskDispatch } from '../contexts/TaskContext';

const Export = ({ tasks }) => {
  const dispatch = useTaskDispatch();

  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(tasks));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'tasks.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImport = event => {
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result);
        dispatch({ type: ADD_ALL, data });
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <header>
      <button class="export" onClick={handleExport}>
        Export
      </button>
      <label class="export" for="file">
        Import
      </label>
      <input class="hidden" onInput={handleImport} id="file" type="file" />
    </header>
  );
};

export default Export;