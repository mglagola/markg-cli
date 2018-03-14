import { createReduxRequest } from 'redux-request-maker';
import xhr from '@utils/xhr';

// TODO:(tk) enter in correct value
// example usage of `createReduxRequest` 

const {
    request,
    reducer,
} = createReduxRequest({
    actionTypePrefix: 'feed',
    callAPI: () => xhr.get('/api/v1/currencies').then(res => res),
});

export const fetchFeed = request;
export default reducer;
