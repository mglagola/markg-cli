import get from 'lodash/get';
import omit from 'lodash/omit';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

const fetchPredictions = () => ({ results: ['NOTHING!'] });

export const searchGooglePlaces = ({ keyword }) => ({
    types: [
        SEARCH_REQUEST,
        SEARCH_SUCCESS,
        SEARCH_FAILURE,
    ],
    callAPI: () => fetchPredictions({ keyword }).then(results => get(results, 'predictions', [])),
    payload: { keyword },
});

const ACTION_HANDLERS = {
    [SEARCH_REQUEST]: (state, action) => ({
        ...omit(state, 'error'),
        status: 'loading',
        keyword: get(action, 'payload.input'),
    }),
    [SEARCH_SUCCESS]: (state, action) => {
        const lastRequestedKeyword = get(state, 'keyword');
        const keyword = get(action, 'payload.input');
        if (lastRequestedKeyword !== keyword) {
            return { ...state };
        }
        return {
            ...state,
            status: 'success',
            results: get(action, 'response', []),
        };
    },
    [SEARCH_FAILURE]: (state, action) => {
        const lastRequestedKeyword = get(state, 'keyword');
        const keyword = get(action, 'payload.input');
        if (lastRequestedKeyword !== keyword) {
            return { ...state };
        }
        return {
            ...state,
            status: 'failure',
            error: get(action, 'error'),
        };
    },
};

export const defaultState: Object = {
    keyword: undefined,
    error: undefined,
    results: undefined,
    status: 'notasked',
};

export default function reducer (state: Object = defaultState, action: Object) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
