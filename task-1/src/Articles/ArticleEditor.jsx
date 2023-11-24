import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ArticleEditor({ article, show, handleClose, handleUpdate }) {

    const update = () => {
        handleUpdate(article.id, title, body);
        handleClose();
    }

    const [title, setTitle] = useState(article.title);
    const [body, setBody] = useState(article.body);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeBody = (e) => {
        setBody(e.target.value);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Article editor</Modal.Title>
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
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={body}
                            onChange={handleChangeBody}
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

export default ArticleEditor