import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { articleReducer } from './articleReducer';
import { photoReducer } from './photoReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    article: articleReducer,
    photo: photoReducer,
    user: userReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));