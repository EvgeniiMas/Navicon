import axios from 'axios'
import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import ArticleCreator from './ArticleCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Articles() {

    const [articles, setArticles] = useState();
    const [columnCount, setColumnCount] = useState(2);
    const [displayedArticleCount, setDisplayedArticleCount] = useState(3);
    const [isShowCreator, setIsShowCreator] = useState(false);

    useEffect(() => {
        let storagedArticles = JSON.parse(localStorage.getItem("articles"));

        if (storagedArticles != null) {

            setArticles(storagedArticles);
        } else {

            let url = 'https://jsonplaceholder.typicode.com/posts';
            axios.get(url).then(
                (resp) => {
                    setArticles(resp.data);
                    localStorage.setItem("articles", JSON.stringify(resp.data));
                },
                (error) => {
                    console.error(error.message);
                }
            );
        }
    }, [setArticles]);

    const handleCloseCreator = () => setIsShowCreator(false);
    const handleShowCreator = () => setIsShowCreator(true);

    const toggleColumnCount = () => {
        setColumnCount(columnCount === 2 ? 3 : 2);
    }

    const increaseDisplayedArticleCount = () => {
        setDisplayedArticleCount(displayedArticleCount + 3);
    }

    const handleUpdateArticle = (id, title, body) => {
        let increasedArticleList = [
            {
                id,
                title,
                body
            },
            ...articles.filter((article) => article.id !== id)
        ];

        setArticles(increasedArticleList);
        localStorage.setItem("articles", JSON.stringify(increasedArticleList));
    }

    const handleRemoveArticle = (id) => {
        let filteredArticles = articles.filter((article) => article.id !== id);
        setArticles(filteredArticles);
        localStorage.setItem("articles", JSON.stringify(filteredArticles));
    }

    const handleCreateArticle = (title, body) => {

        let id = Math.max(...articles.map(article => article.id)) + 1;

        let increasedArticleList = [
            {
                id,
                title,
                body
            },
            ...articles
        ];

        setArticles(increasedArticleList);
        localStorage.setItem("articles", JSON.stringify(increasedArticleList));
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
                        <ArticlePreview article={article} update={handleUpdateArticle} remove={handleRemoveArticle} />
                    </Col>
                )}
            </Row>

            {articles != null && articles.length > displayedArticleCount
                ? <Row>
                    <Button className="col-3 mx-auto my-2" variant="primary" onClick={increaseDisplayedArticleCount}>Show more</Button>
                </Row>
                : null
            }

            <ArticleCreator show={isShowCreator} handleClose={handleCloseCreator} handleCreate={handleCreateArticle} />
        </Container>
    )
}

export default Articles
