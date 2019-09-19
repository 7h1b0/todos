import { h } from 'preact';
import { useState, useCallback, useContext } from 'preact/hooks';

import { createContext } from 'preact';
import { CATEGORIES } from 'utils/categories';

const ModalContext = createContext({
  open: true,
  categoryId: null,
  closeModal: () => {},
  openModal: () => {},
  setCategoryId: () => {},
});
export default ModalContext;

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setStatus] = useState(false);
  const [categoryId, setCategoryId] = useState(CATEGORIES.TODO);
  const openModal = useCallback(() => setStatus(true), []);
  const closeModal = useCallback(() => setStatus(false), []);

  return (
    <ModalContext.Provider
      value={{ open: isOpen, openModal, closeModal, categoryId, setCategoryId }}
    >
      {children}
    </ModalContext.Provider>
  );
};
