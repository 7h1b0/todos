import { h } from 'preact';
import { useState, useCallback, useContext } from 'preact/hooks';

import { createContext } from 'preact';
import { CATEGORIES } from 'utils/categories';

const ModalContext = createContext({
  open: true,
  categoryId: null,
  toggleModal: () => {},
  setCategoryId: () => {},
});
export default ModalContext;

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setStatus] = useState(false);
  const [categoryId, setCategoryId] = useState(CATEGORIES.TODO);
  const toggleModal = useCallback(() => setStatus(open => !open), []);

  return (
    <ModalContext.Provider
      value={{ open: isOpen, toggleModal, categoryId, setCategoryId }}
    >
      {children}
    </ModalContext.Provider>
  );
};
