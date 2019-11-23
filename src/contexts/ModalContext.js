import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';

import { createContext } from 'preact';

const ModalContext = createContext();
export default ModalContext;

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setStatus] = useState(false);
  const [payload, setPayload] = useState();
  const openModal = categoryId => {
    setStatus(true);
    setPayload(categoryId);
  };
  const closeModal = () => setStatus(false);

  return (
    <ModalContext.Provider
      value={{ open: isOpen, openModal, closeModal, payload }}
    >
      {children}
    </ModalContext.Provider>
  );
};
