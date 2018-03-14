import { combineReducers } from 'redux';
import Feed from '@reducers/Feed';
import Details from '@reducers/Details';

const reducers = {
    Feed,
    Details,
};

const rootReducer = (appReducer) => (state, action) => {
    // TODO: placeholder - uncomment if using auth OR delete if not
    // if (action.type === 'SESSION_LOGOUT') {
    //     state = undefined;
    // }
    return appReducer(state, action);
};

function createRootReducer (combinerFunc = combineReducers) {
    const appReducer = combinerFunc(reducers);
    return rootReducer(appReducer);
}

export default createRootReducer;
