const defaultState = {
    articles: []
}

const EDIT_ARTICLE = "EDIT_ARTICLE";
const REMOVE_ARTICLE = "REMOVE_ARTICLE";
const ADD_ARTICLE = "ADD_ARTICLE";
const SAVE_ARTICLES = "SAVE_ARTICLES";

export const articleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EDIT_ARTICLE:
            return {
                ...state,
                articles: state.articles.map((article) => ({
                    id: article.id,
                    title: article.id === action.payload.id
                        ? action.payload.title
                        : article.title,
                    body: article.id === action.payload.id
                        ? action.payload.body
                        : article.body
                }))
            }
        case REMOVE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter((article) => article.id !== action.payload.id)
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        body: action.payload.body
                    },
                    ...state.articles
                ]
            }            
        case SAVE_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        default:
            return state;
    }
}

export const editArticleAction = (payload) => ({ type: EDIT_ARTICLE, payload });
export const removeArticleAction = (payload) => ({ type: REMOVE_ARTICLE, payload });
export const addArticleAction = (payload) => ({ type: ADD_ARTICLE, payload });
export const saveArticlesAction = (payload) => ({ type: SAVE_ARTICLES, payload });