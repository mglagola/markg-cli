import { createReduxRequest } from 'redux-request-maker';
import xhr from '../utils/xhr';

const {
    request,
    reducer,
} = createReduxRequest({
    actionTypePrefix: 'auth',
    callAPI: ({ authType, ...payload }, state) => {
        switch (authType) {
        case 'register':
            return xhr(state).post('/api/v1/register', null, payload);
        case 'login':
        default:
            return xhr(state).post('/api/v1/login', null, payload);
        }
    },
});

const ACTION_HANDLERS = ({
    'auth/reset-failure': (state, action) => ({
        ...state,
        status: 'notasked',
        error: undefined,
    }),
});

export const logout = () => ({
    type: 'auth/reset',
});

export const resetAuthFailure = () => ({
    type: 'auth/reset-failure',
});

export const authUser = request;

export default (state, action) => {
    const handler = ACTION_HANDLERS[action.type];
    if (handler) {
        return handler(state, action);
    }
    return reducer(state, action);
};
