import { createReduxCollRequest } from 'redux-request-maker';
import F from 'lodash/fp';
import xhr from '@utils/xhr';

// TODO:(tk) enter in correct value
// example usage of `createReduxCollRequest`

const {
    reducer,
    request,
} = createReduxCollRequest({
    actionTypePrefix: 'load-item-details',
    primaryKeyPath: ['slug'],
    callAPI: async ({ slug }) => {
        const res = await xhr.get(`/api/v1/currencies/${slug}`);
        return F.pathOr({}, ['result'], res);
    },
});

export const fetchDetails = request;
export default reducer;
