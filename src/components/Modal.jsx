function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
