import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("data-uk-modal", "");
  modalRoot.classList.add("uk-modal");
  modalRoot.id = "add-modal";

  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  });

  return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;
