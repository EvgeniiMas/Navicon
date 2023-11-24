import axios from 'axios'
import { saveUsersAction } from "../store/userReducer";

export const fetchUsers = (url) => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/users').then(
            (resp) => {
                dispatch(saveUsersAction(resp.data));
            },
            (error) => {
                console.error(error.message);
            }
        );
    }
}