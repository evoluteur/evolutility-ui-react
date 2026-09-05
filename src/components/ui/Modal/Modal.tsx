// Evolutility-UI-React :: /ui/Modal/Modal.tsx

// Modal dialog built on the native <dialog> element:
// the browser provides the top layer (no portal), the backdrop,
// the focus trap, and dismissal w/ the Escape key.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import classnames from "classnames";
import { i18n_actions } from "i18n/i18n";

import "./Modal.scss";

export interface ModalProps {
  /** Show or hide the modal */
  isOpen: boolean;
  /** Callback triggered when the modal is dismissed (close icon, Escape key, or click outside) */
  onClose: () => void;
  /** Modal title (no header is shown without it) */
  title?: ReactNode;
  /** Modal content */
  children?: ReactNode;
  /** Buttons shown at the bottom of the modal */
  footer?: ReactNode;
  /** Width of the modal (default: 600px) */
  width?: number | string;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width,
  className,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // - sync the DOM element w/ the isOpen prop
  // - showModal() puts the dialog in the top layer, traps the focus,
  //   and enables dismissal w/ the Escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // - clicks on the backdrop have the dialog itself as target
  const clickDialog = (evt: MouseEvent<HTMLDialogElement>) => {
    if (evt.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={classnames("evo-modal", className)}
      style={width ? { width } : undefined}
      aria-labelledby={title ? titleId : undefined}
      onClose={onClose}
      onClick={clickDialog}
      data-testid="modal"
    >
      <div className="modal-content">
        {title && (
          <div className="modal-header">
            <h4 className="modal-title" id={titleId}>
              {title}
            </h4>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label={i18n_actions.cancel}
            >
              &times;
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </dialog>
  );
};

export default Modal;
