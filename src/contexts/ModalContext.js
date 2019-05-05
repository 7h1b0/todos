import { createContext } from 'preact';

export default createContext({
  open: true,
  statusId: null,
  toggleModal: () => {},
  setStatusId: () => {},
});
