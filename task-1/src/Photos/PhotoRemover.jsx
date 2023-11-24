import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { removePhotoAction } from '../store/photoReducer';

function PhotoRemover({ photo, show, handleClose }) {

    const dispatch = useDispatch();
    const remove = () => {
        dispatch(removePhotoAction({ id: photo.id }));
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