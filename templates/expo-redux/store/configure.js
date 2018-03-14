import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxRequestMiddleware } from 'redux-request-maker';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from '@reducers';
import { persistStore, persistCombineReducers } from '@store/persist';

const ENABLE_DEV_LOGS = false;

const middleware = ENABLE_DEV_LOGS && __DEV__
    ? [thunkMiddleware, createLogger(), reduxRequestMiddleware]
    : [thunkMiddleware, reduxRequestMiddleware];

const createStoreWithMiddleware = compose(
    composeWithDevTools(applyMiddleware(...middleware)),
)(createStore);

function configureStore (initialState = {}) {
    const reducers = createRootReducer(persistCombineReducers);
    const store = createStoreWithMiddleware(reducers, initialState);
    const persistor = persistStore(store);
    return { store, persistor };
};

export default configureStore;
