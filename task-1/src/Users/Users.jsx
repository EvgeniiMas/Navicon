import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserPreview from './UserPreview';
import UserCreator from './UserCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Users() {

    const [users, setUsers] = useState();
    const [columnCount, setColumnCount] = useState(2);
    const [displayedUserCount, setDisplayedUserCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        let storagedUsers = JSON.parse(localStorage.getItem("users"));

        if (storagedUsers != null) {

            setUsers(storagedUsers);
        } else {

            let url = 'https://jsonplaceholder.typicode.com/users';
            axios.get(url).then(
                (resp) => {
                    setUsers(resp.data);
                    localStorage.setItem("users", JSON.stringify(resp.data));
                },
                (error) => {
                    console.error(error.message);
                }
            );
        }
    }, [setUsers]);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedUserCount = () => {
        setDisplayedUserCount(displayedUserCount + 3);
    }

    const handleUpdateUser = (id, name, email, phone, username, website) => {
        let increasedUserList = [
            {
                id,
                name,
                email,
                phone,
                username,
                website
            },
            ...users.filter((user) => user.id !== id)
        ];

        setUsers(increasedUserList);
        localStorage.setItem("users", JSON.stringify(increasedUserList));
    }

    const handleRemoveUser = (id) => {
        let filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
        localStorage.setItem("users", JSON.stringify(filteredUsers));
    }

    const handleCreateUser = (name, email, phone, username, website) => {

        let id = Math.max(...users.map(user => user.id)) + 1;

        let increasedUserList = [
            {
                id,
                name,
                email,
                phone,
                username,
                website
            },
            ...users
        ];

        setUsers(increasedUserList);
        localStorage.setItem("users", JSON.stringify(increasedUserList));
    }

    return (
        <Container>
            <Row className="my-2">
                <Col>
                    <h2>User List</h2>
                </Col>
                <Col>
                    <Stack direction="horizontal" gap={3}>
                        <Button className="ms-auto" variant="primary" onClick={toggleColumnCount}>
                            {columnCount === 2
                                ? "Make small cards"
                                : "Make big cards"
                            }
                        </Button>
                        <Button variant="primary" onClick={handleShowCreator}>Add user</Button>
                    </Stack>
                </Col>
            </Row>

            <Row>
                {users != null && users.slice(0, displayedUserCount).map((user) =>
                    <Col key={user.id} xs={12 / columnCount}>
                        <UserPreview user={user} update={handleUpdateUser} remove={handleRemoveUser} />
                    </Col>
                )}
            </Row>

            {users != null && users.length > displayedUserCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedUserCount}>Show more</Button>
                </Row>
                : null
            }

            <UserCreator show={isShowCreator} handleClose={handleCloseCreator} handleCreate={handleCreateUser} />
        </Container>
    )
}

export default Users
