const defaultState = {
    users: []
}

const EDIT_USER = "EDIT_USER";
const REMOVE_USER = "REMOVE_USER";
const ADD_USER = "ADD_USER";
const SAVE_USERS = "SAVE_USERS";


export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) => ({
                    id: user.id,
                    name: user.id === action.payload.id
                        ? action.payload.name
                        : user.name,
                    email: user.id === action.payload.id
                        ? action.payload.email
                        : user.email,
                    phone: user.id === action.payload.id
                        ? action.payload.phone
                        : user.phone,
                    username: user.id === action.payload.id
                        ? action.payload.username
                        : user.username,
                    website: user.id === action.payload.id
                        ? action.payload.website
                        : user.website
                }))
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload.id)
            }
        case ADD_USER:
            return {
                ...state,
                users: [
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        email: action.payload.email,
                        phone: action.payload.phone,
                        username: action.payload.username,
                        website: action.payload.website
                    },
                    ...state.users
                ]
            }
        case SAVE_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}

export const editUserAction = (payload) => ({ type: EDIT_USER, payload });
export const removeUserAction = (payload) => ({ type: REMOVE_USER, payload });
export const addUserAction = (payload) => ({ type: ADD_USER, payload });
export const saveUsersAction = (payload) => ({ type: SAVE_USERS, payload });