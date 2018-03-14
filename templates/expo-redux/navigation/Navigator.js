import { StackNavigator } from 'react-navigation';
import FeedScreen from '@screens/FeedScreen';
import DetailsScreen from '@screens/DetailsScreen';
import F from 'lodash/fp';

// TODO:(tk) enter in correct routes
const routes = {
    Feed: {
        screen: FeedScreen,
        statusBarStyle: 'light-content',
    },
    Details: {
        screen: DetailsScreen,
        path: '/details/:id',
        statusBarStyle: 'default',
    },
};

const defaultHeaderStyle = {
    backgroundColor: '#218c74',
};

const defaultOptions = {
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: defaultHeaderStyle,
    },
};

export function statusBarStyleFromRoute (routeName, defaultValue = 'default') {
    return F.getOr(defaultValue, [routeName, 'statusBarStyle'], routes);
}

export function createStackNavigator (options) {
    return StackNavigator(routes, Object.assign({}, defaultOptions, options));
}
