import { ReactNode } from 'react';
import './style.scss';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  children,
  close,
}: {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
}) {
  return (
    <>
      {isOpen &&
        createPortal(
          <div className="modal-overlay" onClick={close}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
              {children}
            </div>
          </div>,
          document.querySelector('.overlay') as Element
        )}
    </>
  );
}
