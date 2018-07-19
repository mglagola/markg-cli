import { combineReducers } from 'redux';
import Auth from '../reducers/Auth';

const reducers = {
    Auth,
};

const rootReducer = (appReducer) => (state, action) => {
    if (action.type === 'auth/reset') {
        state = undefined;
    }
    return appReducer(state, action);
};

function createRootReducer (combinerFunc = combineReducers) {
    const appReducer = combinerFunc(reducers);
    return rootReducer(appReducer);
}

export default createRootReducer;
