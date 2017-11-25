import { createReduxRequest } from 'redux-request-maker';
import fetch from 'isomorphic-unfetch';

const {
    reducer,
    request,
} = createReduxRequest({
    actionTypePrefix: 'search',
    callAPI: async (query, state) => fetch('api/fake/endpoint', query),
});

export const req = request;
export default reducer;
