import Router from 'next/router';
import F from 'lodash/fp';
import Config from '../config';

const routeNameToPath = (routeName) => F.compose(
    F.head,
    x => [].concat(x),
    F.getOr([], ['routes', routeName, 'path'])
)(Config);

const reset = (routeName, _) => {
    const p = routeNameToPath(routeName);
    Router.push(p);
};

const navigate = (routeName, _) => {
    const p = routeNameToPath(routeName);
    Router.push(p);
};

const back = (_) => {
    Router.back();
};

export default {
    reset,
    navigate,
    back,
};
