// @flow

'use strict';

import { combineReducers } from 'redux';
import Search from './Search';

const appReducer = combineReducers({
    Search,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
