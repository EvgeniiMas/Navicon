import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PhotoRemover({ photo, show, handleClose, handleRemove }) {

    const remove = () => {
        handleRemove(photo.id);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Photo remover</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you really want to delete this card?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={remove}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PhotoRemover