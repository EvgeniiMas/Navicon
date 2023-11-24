import React from 'react';
import Modal from 'react-bootstrap/Modal';

function PhotoDetails({ photo, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Photo info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>{photo.title}</b>
                </p>
                <img src={photo.url} />
            </Modal.Body>
        </Modal>
    )
}

export default PhotoDetails