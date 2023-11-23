import React from 'react';
import Modal from 'react-bootstrap/Modal';

function UserDetails({ user, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>{user.name}</b>
                </p>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.website}</p>
            </Modal.Body>
        </Modal>
    )
}

export default UserDetails