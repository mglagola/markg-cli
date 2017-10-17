const callAPIMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
    const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload = {},
    } = action;

    if (!types) {
        return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
        throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.');
    }

    const state = getState();
    if (!shouldCallAPI(state)) {
        return;
    }

    const [ requestType, successType, failureType ] = types;

    dispatch({
        type: requestType,
        payload,
    });

    try {
        const response = await callAPI(state);

        if (response.statusCode
            && (response.statusCode < 200 || response.statusCode > 299)
            && response.error) {
            dispatch({
                type: failureType,
                error: response,
                payload,
            });
        } else {
            dispatch({
                type: successType,
                response,
                payload,
            });
        }
    } catch (error) {
        dispatch({
            type: failureType,
            error,
            payload,
        });
    }
};

export default callAPIMiddleware;
