import React, { useEffect, useState } from 'react';
import UserPreview from './UserPreview';
import UserCreator from './UserCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../asyncActions/users';

function Users() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const [columnCount, setColumnCount] = useState(2);
    const [displayedUserCount, setDisplayedUserCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedUserCount = () => {
        setDisplayedUserCount(displayedUserCount + 3);
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
                        <UserPreview user={user} />
                    </Col>
                )}
            </Row>

            {users != null && users.length > displayedUserCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedUserCount}>Show more</Button>
                </Row>
                : null
            }

            <UserCreator show={isShowCreator} handleClose={handleCloseCreator} />
        </Container>
    )
}

export default Users
