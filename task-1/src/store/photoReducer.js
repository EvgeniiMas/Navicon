const defaultState = {
    photos: []
}

const EDIT_PHOTO = "EDIT_PHOTO";
const REMOVE_PHOTO = "REMOVE_PHOTO";
const ADD_PHOTO = "ADD_PHOTO";
const SAVE_PHOTOS = "SAVE_PHOTOS";

export const photoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EDIT_PHOTO:
            return {
                ...state,
                photos: state.photos.map((photo) => ({
                    id: photo.id,
                    title: photo.id === action.payload.id
                        ? action.payload.title
                        : photo.title,
                    url: photo.id === action.payload.id
                        ? action.payload.url
                        : photo.url
                }))
            }
        case REMOVE_PHOTO:
            return {
                ...state,
                photos: state.photos.filter((photo) => photo.id !== action.payload.id)
            };
        case ADD_PHOTO:
            return {
                ...state,
                photos: [
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        url: action.payload.url
                    },
                    ...state.photos
                ]
            }   
        case SAVE_PHOTOS:
            return {
                ...state,
                photos: action.payload
            }
        default:
            return state;
    }
}

export const editPhotoAction = (payload) => ({ type: EDIT_PHOTO, payload });
export const removePhotoAction = (payload) => ({ type: REMOVE_PHOTO, payload });
export const addPhotoAction = (payload) => ({ type: ADD_PHOTO, payload });
export const savePhotosAction = (payload) => ({ type: SAVE_PHOTOS, payload });