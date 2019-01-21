import createStore from 'unistore';
import { TODO } from './utils/status';

const store = createStore({
  tasks: [],
  db: null,
  modal: false,
  statusId: TODO.id,
});

export default store;
