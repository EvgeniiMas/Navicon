import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ArticleDetails from './ArticleDetails';
import ArticleEditor from './ArticleEditor';
import ArticleRemover from './ArticleRemover';

function ArticlePreview({ article }) {
    const limitTitleCharacterCount = 30;
    const limitBodyCharacterCount = 120;

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

    const handleCloseRemover = () => setIsShowRemover(false);
    const handleShowRemover = () => setIsShowRemover(true);

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
                    {article.title.length > limitTitleCharacterCount
                        ? article.title.substr(0, limitTitleCharacterCount - 3) + '...'
                        : article.title
                    }
                </b>
            </p>
            <p>
                {article.body.length > limitBodyCharacterCount
                    ? article.body.substr(0, limitBodyCharacterCount - 3) + '...'
                    : article.body
                }
            </p>

            <ButtonGroup aria-label="Basic example">
                <Button variant="outline-secondary" onClick={handleShowDetails}>View</Button>
                <Button variant="outline-secondary" onClick={toggleColorSet}>Change color</Button>
                <Button variant="outline-secondary" onClick={handleShowEditor}>Edit</Button>
                <Button variant="outline-secondary" onClick={handleShowRemover}>Delete</Button>
            </ButtonGroup>

            <ArticleDetails article={article} show={isShowDetails} handleClose={handleCloseDetails} />
            <ArticleEditor article={article} show={isShowEditor} handleClose={handleCloseEditor} />
            <ArticleRemover article={article} show={isShowRemover} handleClose={handleCloseRemover} />
        </Container>
    )
}

export default ArticlePreview