import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { addArticleAction } from "../store/articleReducer";

function ArticleCreator({ show, handleClose }) {

    const dispatch = useDispatch();
    const articles = useSelector(state => state.article.articles);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const save = () => {
        let id = Math.max(...articles.map(article => article.id)) + 1;
        dispatch(addArticleAction({ id, title, body }));
        setTitle("");
        setBody("");
        handleClose();
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeBody = (e) => {
        setBody(e.target.value);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Article creator</Modal.Title>
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

export default ArticleCreator