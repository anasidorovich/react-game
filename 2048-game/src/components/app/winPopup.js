import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WinPopup = ({ theme, show, onHide }) => {
  return (
    <>
      <Modal
        contentClassName={theme}
        show={show}
        onHide={onHide}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            You Win!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p></p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WinPopup;
