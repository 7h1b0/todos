import { createContext } from 'preact';

export default createContext({
  open: true,
  categoryId: null,
  toggleModal: () => {},
  setCategoryId: () => {},
});
