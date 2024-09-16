import axios from 'axios'
import { saveArticlesAction } from "../store/articleReducer";

export const fetchArticles = (url) => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(
            (resp) => {
                dispatch(saveArticlesAction(resp.data));
            },
            (error) => {
                console.error(error.message);
            }
        );
    }
}