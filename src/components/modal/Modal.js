import React from "react";
import Button from "../button/Button";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ setIsOpen, modalTitle, modalDetails, submitFunction }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div className="x-icon">
            <FontAwesomeIcon icon={faX} onClick={() => setIsOpen(false)} />
          </div>
          <h2 className="modal-title">{modalTitle}</h2>
        </div>
        <div className="modal-body">{modalDetails}</div>
        <div className="modal-footer">
          <Button
            label="Yes"
            disabled={false}
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              submitFunction(event);
              setIsOpen(false);
            }}
            parentClassName="left-button"
          />
          <Button
            label="No"
            disabled={false}
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
