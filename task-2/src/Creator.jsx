import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Creator({ show, handleClose, handleCreate }) {

    const [id, setId] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const create = () => {
        handleCreate(Number(id), firstname, lastname, email, phone);
        setId('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        handleClose();
    }

    const handleChangeId = (e) => {
        setId(e.target.value);
    }

    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }

    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                autoFocus
                                type="number"
                                value={id}
                                onChange={ handleChangeId }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                value={firstname}
                                onChange={handleChangeFirstname}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                value={lastname}
                                onChange={handleChangeLastname}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phone"
                                value={phone}
                                onChange={handleChangePhone}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={create}
                        disabled={!(id.length > 0 && firstname.length > 0 && lastname.length > 0 && email.length > 0 && phone.length > 0)}
                    >
                        Add
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Creator;