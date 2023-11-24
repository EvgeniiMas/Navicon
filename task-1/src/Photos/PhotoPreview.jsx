import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import PhotoDetails from './PhotoDetails';
import PhotoEditor from './PhotoEditor';
import PhotoRemover from './PhotoRemover';

function PhotoPreview({ photo, update, remove }) {
    const colorSets = [{
        backgroundColor: "#ffffff",
        textColor: "#000000"
    }, {
        backgroundColor: "#ffd966",
        textColor: "#3333ff"
    }, {
        backgroundColor: "#000000",
        textColor: "#ffffff"
    }];

    const [selectedColorSetNumber, setSelectedColorSetNumber] = useState(0);
    const [isShowDetails, setIsShowDetails] = useState(false);
    const [isShowEditor, setIsShowEditor] = useState(false);
    const [isShowRemover, setIsShowRemover] = useState(false);

    const handleCloseDetails = () => setIsShowDetails(false);
    const handleShowDetails = () => setIsShowDetails(true);

    const handleCloseEditor = () => setIsShowEditor(false);
    const handleShowEditor = () => setIsShowEditor(true);
    const handleUpdate = (id, title, url) => {
        update(id, title, url);
    }

    const handleCloseRemover = () => setIsShowRemover(false);
    const handleShowRemover = () => setIsShowRemover(true);
    const handleRemove = (id) => {
        remove(id);
    }

    const toggleColorSet = () => {
        setSelectedColorSetNumber((selectedColorSetNumber + 1) % colorSets.length);
    }

    return (
        <Container
            className="border border-secondary rounded p-1 my-2"
            style={{
                backgroundColor: colorSets[selectedColorSetNumber].backgroundColor,
                color: colorSets[selectedColorSetNumber].textColor
            }}
        >
            <p>
                <b>
                    {photo.title}
                </b>
            </p>
            <p>
                {photo.url}
            </p>

            <ButtonGroup aria-label="Basic example">
                <Button variant="outline-secondary" onClick={handleShowDetails}>View</Button>
                <Button variant="outline-secondary" onClick={toggleColorSet}>Change color</Button>
                <Button variant="outline-secondary" onClick={handleShowEditor}>Edit</Button>
                <Button variant="outline-secondary" onClick={handleShowRemover}>Delete</Button>
            </ButtonGroup>

            <PhotoDetails photo={photo} show={isShowDetails} handleClose={handleCloseDetails} />
            <PhotoEditor photo={photo} show={isShowEditor} handleClose={handleCloseEditor} handleUpdate={handleUpdate} />
            <PhotoRemover photo={photo} show={isShowRemover} handleClose={handleCloseRemover} handleRemove={handleRemove} />
        </Container>
    )
}

export default PhotoPreview