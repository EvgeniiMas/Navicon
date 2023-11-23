import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>React task 1</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/#/articles">Articles</Nav.Link>
                    <Nav.Link href="/#/users">Users</Nav.Link>
                    <Nav.Link href="/#/photos">Photos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
