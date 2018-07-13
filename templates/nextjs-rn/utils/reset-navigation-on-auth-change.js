import { connect } from 'react-redux';
import F from 'lodash/fp';
import { lifecycle } from 'recompose';
import Navigation from '../navigation/navigation';

const mapStateToProps = (state, ownProps) => {
    const isAuthed = F.compose(
        token => !F.isEmpty(token),
        F.getOr(null, ['Auth', 'result', 'token']),
    )(state);
    return {
        ...ownProps,
        isAuthed,
    };
};

export default (routeName, changeType = 'onChangeFromAuthToUnauth') => {
    if (F.isNil(routeName)) {
        throw new Error('`routeName` required');
    }

    const checkAuth = (props = {}, prevProps = {}) => {
        const prevIsAuthed = prevProps.isAuthed;
        const { navigation, isAuthed } = props;
        switch (changeType) {
        case 'onChangeFromAuthToUnauth':
            if ((prevIsAuthed || F.isNil(prevIsAuthed)) && !isAuthed) {
                Navigation.reset(routeName, navigation);
            }
            break;
        case 'onChangeFromUnauthToAuth':
            if ((prevIsAuthed === false || F.isNil(prevIsAuthed)) && isAuthed) {
                Navigation.reset(routeName, navigation);
            }
            break;
        }
    };

    return F.compose(
        connect(mapStateToProps, null),
        lifecycle({
            componentDidMount () {
                checkAuth(this.props);
            },
            componentDidUpdate (prevProps) {
                checkAuth(this.props, prevProps);
            },
        }),
    );
};
