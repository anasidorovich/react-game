import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Popup = ({ theme, show, onHide, popup }) => {
  return (
    <>
      <Modal
        contentClassName={theme}
        show={show}
        onHide={onHide}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {popup.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={popup.type}></div>
          <h4 className="text-center pt-4 pb-3">{popup.message}</h4>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
