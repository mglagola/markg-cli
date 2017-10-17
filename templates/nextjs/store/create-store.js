import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';

const isDev = process.env.NODE_ENV === 'development';

const middleware = isDev
    ? [thunkMiddleware, api, createLogger()]
    : [thunkMiddleware, api];

const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware)
)(createStore);

function configureStore (initialState = {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
}

export default configureStore;
