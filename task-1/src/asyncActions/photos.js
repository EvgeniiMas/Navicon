import axios from 'axios';
import { savePhotosAction } from "../store/photoReducer";

export const fetchPhotos = () => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/photos').then(
            (resp) => {
                dispatch(savePhotosAction(resp.data));
            },
            (error) => {
                console.error(error.message);
            }
        );
    }
}