import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../Icons/CloseIcon';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const inputRef = useRef(null);

  const closeModal = () => {
    if (inputRef.current) {
      const modal = inputRef.current as HTMLDialogElement;
      modal.close();
    }
  };

  return (
    <>
      <dialog
        id='modal-dialog'
        ref={inputRef}
        className='modal-box rounded-lg bg-white'
      >
        <div className='px-20 py-10'>
          {children}
          <div className='modal-action'>
            <button
              data-testid='delete-button'
              onClick={() => {
                closeModal();
              }}
              className='btn btn-ghost absolute right-0 top-0 p-2'
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
