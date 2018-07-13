import React from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation } from 'react-native';
import compose from 'lodash/fp/compose';
import F from 'lodash/fp';
import { lifecycle, withProps } from 'recompose';
import { authUser, resetAuthFailure } from '../reducers/Auth';
import Auth from '../components/Auth';
import Navigation from '../navigation/navigation';
import withKeyboardAvoidingView from '../utils/with-keyboard-avoiding-view';
import { DEFAULT_LAYOUT_ANIMATION_CONFIG } from '../utils/layout-animation';
import Config from '../config';

const mapStateToProps = (state, ownProps) => {
    const status = F.getOr('notasked', ['Auth', 'status'], state);
    const {
        user,
        token,
    } = F.getOr({}, ['Auth', 'result'], state);
    const { message: errorMessage } = F.getOr({}, ['Auth', 'error'], state);
    return {
        ...ownProps,
        status,
        user,
        token,
        errorMessage,
    };
};

const mapActionCreators = {
    authUser,
    resetAuthFailure,
};

export default compose(
    connect(mapStateToProps, mapActionCreators),
    lifecycle({
        componentWillMount () {
            const { status, resetAuthFailure, token, navigation } = this.props;
            if (status === 'failure') {
                resetAuthFailure();
            }
            if (!F.isEmpty(token)) {
                Navigation.reset(Config.auth.alreadyAuthedRouteName, navigation);
            }
        },
        componentDidUpdate (prevProps) {
            const props = this.props;
            if (F.isEmpty(prevProps.user) && !F.isEmpty(props.user)) {
                Navigation.reset(Config.auth.alreadyAuthedRouteName, props.navigation);
            }
            LayoutAnimation.configureNext(DEFAULT_LAYOUT_ANIMATION_CONFIG);
        },
    }),
    withProps(({ authType, changeAuthType }) => {
        switch (authType) {
        case 'login':
            return {
                authHeaderText: 'Login',
                switchAuthDescriptionText: 'Need an account?',
                switchAuthActionText: 'Sign Up',
                onSwitchAuthTypePress: () => changeAuthType('register'),
            };
        case 'register':
            return {
                authHeaderText: 'Sign Up',
                switchAuthDescriptionText: 'Already have an account?',
                switchAuthActionText: 'Login',
                onSwitchAuthTypePress: () => changeAuthType('login'),
            };
        default: {
            return {};
        }
        }
    }),
    withKeyboardAvoidingView({ keyboardVerticalOffset: 0 }),
)(class extends React.Component {
    constructor (props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    render () {
        return (
            <Auth
                {...this.props}
                onEmailChange={(text) => this.setState({ email: text })}
                onPasswordChange={(text) => this.setState({ password: text })}
                authUser={() => {
                    const { email, password } = this.state;
                    const { authType } = this.props;
                    return this.props.authUser({ authType, email, password });
                }}
            />
        );
    }
});
