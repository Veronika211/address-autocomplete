import React from "react";
import Button from "../button/Button";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { BUTTON_VARIANTS } from "../../helpers/constants";

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
            variant={BUTTON_VARIANTS.FILLED}
            parentClassName="left-button"
          />
          <Button
            label="No"
            disabled={false}
            variant={BUTTON_VARIANTS.OUTLINED}
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
