import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { NavigationStyles } from '../constants/styles';
import CardStyle from '../constants/card-style';
import ProgressBar from '../components/ProgressBar';

const NavBar = ({
    headerLeft,
    headerRight,
    headerTitle,
    headerStyle,
    headerCardStyle = true,
    headerLeftStyle,
    headerCenterStyle,
    headerRightStyle,
}) => (
    <View style={[headerCardStyle ? CardStyle : null, styles.navBar, headerStyle]}>
        <View style={[styles.navLeft, headerLeftStyle]}>{headerLeft}</View>
        <View style={[styles.navCenter, headerCenterStyle]}>{headerTitle}</View>
        <View style={[styles.navRight, headerRightStyle]}>{headerRight}</View>
    </View>
);

const DefaultLayout = ({
    children,
    navigationProps = {},
}) => (
    <div className='layout'>
        <ProgressBar />
        <NavBar {...navigationProps} />
        <div className='layout-inner'>
            { children }
        </div>
    </div>
);

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 5,
        height: 50,
        backgroundColor: NavigationStyles.backgroundColor,
        borderBottomColor: NavigationStyles.borderBottomColor,
        borderBottomWidth: 0,
        borderRadius: 0,
        zIndex: 10,
    },
    navLeft: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRight: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navCenter: {
        justifyContent: 'center',
    },
});

export default DefaultLayout;
