import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { editPhotoAction } from '../store/photoReducer';

function PhotoEditor({ photo, show, handleClose }) {

    const dispatch = useDispatch();
    const [title, setTitle] = useState(photo.title);
    const [url, setUrl] = useState(photo.url);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeUrl = (e) => {
        setUrl(e.target.value);
    }

    const update = () => {
        dispatch(editPhotoAction({ id: photo.id, title, url }));
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Photo editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            autoFocus
                            value={title}
                            onChange={handleChangeTitle}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Url</Form.Label>
                        <Form.Control
                            value={url}
                            onChange={handleChangeUrl}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={update}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>                
            </Modal.Footer>
        </Modal>
    )
}

export default PhotoEditor