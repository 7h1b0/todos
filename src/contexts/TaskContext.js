import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

const TaskContext = createContext(() => {});
export default TaskContext;

export const useTask = () => useContext(TaskContext);
