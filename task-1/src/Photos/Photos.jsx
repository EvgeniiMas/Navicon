import React, { useEffect, useState } from 'react';
import PhotoPreview from './PhotoPreview';
import PhotoCreator from './PhotoCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../asyncActions/photos';

function Photos() {

    const dispatch = useDispatch();
    const photos = useSelector(state => state.photo.photos);
    const [columnCount, setColumnCount] = useState(2);
    const [displayedPhotoCount, setDisplayedPhotoCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, []);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedPhotoCount = () => {
        setDisplayedPhotoCount(displayedPhotoCount + 3);
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
                        <PhotoPreview photo={photo} />
                    </Col>
                )}
            </Row>

            {photos != null && photos.length > displayedPhotoCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedPhotoCount}>Show more</Button>
                </Row>
                : null
            }

            <PhotoCreator show={isShowCreator} handleClose={handleCloseCreator} />
        </Container>
    )
}

export default Photos
