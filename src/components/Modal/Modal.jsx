"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "react-feather";
import { useModal } from "../../Context/Modal/ModalContext";

const Modal = ({ children }) => {
  const { modal, closeModal } = useModal();

  return (
    <div>
      <Dialog open={!!modal} onClose={closeModal} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in "
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[24rem] data-closed:sm:translate-y-0 data-closed:sm:scale-95 "
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 p-1 rounded-lg text-gray-400"
              >
                <X />
              </button>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div className="sm:flex sm:items-start justify-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex justify-center mt-2">{children}</div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
