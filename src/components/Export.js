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
      <button class="export" onClick={handleExport} type="button">
        <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Export
      </button>
      <label class="export">
        <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Import
        <input class="hidden" onInput={handleImport} type="file" />
      </label>
    </header>
  );
};

export default Export;
