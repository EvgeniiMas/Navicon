import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from '../store/userReducer';

function UserCreator({ show, handleClose }) {

    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleChangeWebsite = (e) => {
        setWebsite(e.target.value);
    }

    const save = () => {
        var id = Math.max(...users.map((user) => user.id)) + 1;
        dispatch(addUserAction({ id, name, email, phone, username, website }));
        setName("");
        setEmail("");
        setPhone("");
        setUsername("");
        setWebsite("");
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User creator</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            value={name}
                            onChange={handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            value={phone}
                            onChange={handleChangePhone}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            value={website}
                            onChange={handleChangeWebsite}
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

export default UserCreator