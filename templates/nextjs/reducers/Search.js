import { createReduxRequest } from 'redux-request-maker';
import xhr from '@utils/xhr';

const {
    reducer,
    request,
} = createReduxRequest({
    actionTypePrefix: 'search',
    callAPI: async (query, state) => xhr.get('api/fake/endpoint', query),
});

export request;
export default reducer;
