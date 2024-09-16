import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import ArticleCreator from './ArticleCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from '../asyncActions/articles';

function Articles() {

    const dispatch = useDispatch();
    const articles = useSelector(state => state.article.articles);
    const [columnCount, setColumnCount] = useState(2);
    const [displayedArticleCount, setDisplayedArticleCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        dispatch(fetchArticles());
    }, []);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedArticleCount = () => {
        setDisplayedArticleCount(displayedArticleCount + 3);
    }

    return (
        <Container>
            <Row className="my-2">
                <Col>
                    <h2>Article List</h2>
                </Col>
                <Col>
                    <Stack direction="horizontal" gap={3}>
                        <Button className="ms-auto" variant="primary" onClick={toggleColumnCount}>
                            {columnCount === 2
                                ? "Make small cards"
                                : "Make big cards"
                            }
                        </Button>
                        <Button variant="primary" onClick={handleShowCreator}>Add article</Button>
                    </Stack>
                </Col>
            </Row>

            <Row>
                {articles != null && articles.slice(0, displayedArticleCount).map((article) =>
                    <Col key={article.id} xs={12 / columnCount}>
                        <ArticlePreview article={article} />
                    </Col>
                )}
            </Row>

            {articles != null && articles.length > displayedArticleCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedArticleCount}>Show more</Button>
                </Row>
                : null
            }

            <ArticleCreator show={isShowCreator} handleClose={handleCloseCreator} />
        </Container>
    )
}

export default Articles
