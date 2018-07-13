import Container from '../containers/AuthContainer';
import withLayout from '../utils/with-layout';
import DefaultLayout from '../components/DefaultLayout';
import React from 'react';
import F from 'lodash/fp';
import { AppStyles, NavigationStyles } from '../constants/styles';
import NavigationTitle from '../components/NavigationTitle';
import { withProps } from 'recompose';
import Router from 'next/router';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';

export default F.compose(
    withStyleConstraintsOnResize(),
    withLayout(DefaultLayout, ({ deviceSize }) => ({
        headerTintColor: NavigationStyles.tintColor,
        headerTitle: <NavigationTitle textStyle={{ color: 'white' }}>Welcome</NavigationTitle>,
        headerStyle: {
            ...NavigationStyles.defaultStyle,
            backgroundColor: NavigationStyles.backgroundColor,
            borderBottomWidth: 0,
            display: deviceSize.width < AppStyles.layout.maxMobileListWidth
                ? 'none'
                : 'flex',
        },
    })),
    withProps(() => {
        const pathname = Router.asPath;
        const changeAuthType = (type) => {
            Router.push(`/auth`, `/${type}`);
        };
        switch (pathname) {
        case '/login':
            return {
                authType: 'login',
                changeAuthType,
            };
        case '/register':
            return {
                authType: 'register',
                changeAuthType,
            };
        }
        return {
            changeAuthType,
        };
    })
)(Container);
