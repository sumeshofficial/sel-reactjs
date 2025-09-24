import { useState } from "react";
import { ModalContext } from "./ModalContext"

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = ( type, props = {} ) => setModal( { type, props } );
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
