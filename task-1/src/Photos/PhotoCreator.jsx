import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addPhotoAction } from '../store/photoReducer';

function PhotoCreator({ show, handleClose }) {

    const dispatch = useDispatch();
    const photos = useSelector(state => state.photo.photos);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeUrl = (e) => {
        setUrl(e.target.value);
    }

    const save = () => {
        let id = Math.max(...photos.map((photo) => photo.id)) + 1;
        dispatch(addPhotoAction({ id, title, url }));
        setTitle("");
        setUrl("");
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Photo creator</Modal.Title>
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
                <Button variant="primary" onClick={save}>
                    Create
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PhotoCreator