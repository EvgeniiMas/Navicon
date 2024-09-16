import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { removeArticleAction } from "../store/articleReducer";

function ArticleRemover({ article, show, handleClose }) {

    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeArticleAction({ id: article.id }));
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Article remover</Modal.Title>
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

export default ArticleRemover