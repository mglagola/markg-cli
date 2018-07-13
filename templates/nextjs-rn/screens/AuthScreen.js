import F from 'lodash/fp';
import { withState } from 'recompose';
import Container from '../containers/AuthContainer';
import withNavigationOptions from '../utils/with-navigation-options';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';

export default F.compose(
    withNavigationOptions((props) => ({
        headerStyle: {
            display: 'none',
        },
    })),
    withState('authType', 'changeAuthType', 'register'),
    withStyleConstraintsOnResize(),
)(Container);
