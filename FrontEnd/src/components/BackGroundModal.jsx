import { createPortal } from "react-dom";

function BackGroundModal({ isOpen, children }) {
    const modalElement = document.getElementById("modal");

    if(!isOpen) return null

    return createPortal(
        <div className="modal-overlay open">
            {children}
        </div>,
        modalElement
    );
}

export default BackGroundModal