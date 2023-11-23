import axios from 'axios'
import React, { useEffect, useState } from 'react';
import PhotoPreview from './PhotoPreview';
import PhotoCreator from './PhotoCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Photos() {

    const [photos, setPhotos] = useState();
    const [columnCount, setColumnCount] = useState(2);
    const [displayedPhotoCount, setDisplayedPhotoCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        let storagedPhotos = JSON.parse(localStorage.getItem("photos"));

        if (storagedPhotos != null) {

            setPhotos(storagedPhotos);
        } else {

            let url = 'https://jsonplaceholder.typicode.com/photos';
            axios.get(url).then(
                (resp) => {
                    setPhotos(resp.data);
                    localStorage.setItem("photos", JSON.stringify(resp.data));
                },
                (error) => {
                    console.error(error.message);
                }
            );
        }
    }, [setPhotos]);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedPhotoCount = () => {
        setDisplayedPhotoCount(displayedPhotoCount + 3);
    }

    const handleUpdatePhoto = (id, title, url) => {
        let increasedPhotoList = [
            {
                id,
                title,
                url
            },
            ...photos.filter((photo) => photo.id !== id)
        ];

        setPhotos(increasedPhotoList);
        localStorage.setItem("photos", JSON.stringify(increasedPhotoList));
    }

    const handleRemovePhoto = (id) => {
        let filteredPhotos = photos.filter((photo) => photo.id !== id);
        setPhotos(filteredPhotos);
        localStorage.setItem("photos", JSON.stringify(filteredPhotos));
    }

    const handleCreatePhoto = (title, url) => {

        let id = Math.max(...photos.map(photo => photo.id)) + 1;

        let increasedPhotoList = [
            {
                id,
                title,
                url
            },
            ...photos
        ];

        setPhotos(increasedPhotoList);
        localStorage.setItem("photos", JSON.stringify(increasedPhotoList));
    }

    return (
        <Container>
            <Row className="my-2">
                <Col>
                    <h2>Photo List</h2>
                </Col>
                <Col>
                    <Stack direction="horizontal" gap={3}>
                        <Button className="ms-auto" variant="primary" onClick={toggleColumnCount}>
                            {columnCount === 2
                                ? "Make small cards"
                                : "Make big cards"
                            }
                        </Button>
                        <Button variant="primary" onClick={handleShowCreator}>Add photo</Button>
                    </Stack>
                </Col>
            </Row>

            <Row>
                {photos != null && photos.slice(0, displayedPhotoCount).map((photo) =>
                    <Col key={photo.id} xs={12 / columnCount}>
                        <PhotoPreview photo={photo} update={handleUpdatePhoto} remove={handleRemovePhoto} />
                    </Col>
                )}
            </Row>

            {photos != null && photos.length > displayedPhotoCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedPhotoCount}>Show more</Button>
                </Row>
                : null
            }

            <PhotoCreator show={isShowCreator} handleClose={handleCloseCreator} handleCreate={handleCreatePhoto} />
        </Container>
    )
}

export default Photos
