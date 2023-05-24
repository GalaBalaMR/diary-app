import React, { useState } from "react";

const Modal = (props) => {
    const handleClose = () => {
        props.onClose();
    };

    // if (!props.isOpen) {
    //     return null;
    // }

    return (
        <div className="my-modal" onClick={handleClose}>
            <div className="my-modal-content" onClick={(e) => { e.stopPropagation(); }}>{props.children}</div>
        </div>
    );
};

export default Modal;
