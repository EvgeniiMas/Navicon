import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ArticleDetails({ article, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Article info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>{article.title}</b>
                </p>
                <p>{article.body}</p>
            </Modal.Body>
        </Modal>
    )
}

export default ArticleDetails