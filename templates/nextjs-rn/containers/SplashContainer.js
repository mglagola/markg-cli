import { connect } from 'react-redux';
import F from 'lodash/fp';
import { withProps } from 'recompose';
import Splash from '../components/Splash';
import Navigation from '../navigation/navigation';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';
import Config from '../config';

const mapStateToProps = (state, ownProps) => {
    const token = F.get(['Auth', 'result', 'token'], state);
    const isAuthed = !F.isEmpty(token);
    return {
        isAuthed,
    };
};

const mapActionCreators = {
};

export default F.compose(
    withStyleConstraintsOnResize(),
    connect(mapStateToProps, mapActionCreators),
    withProps(({ isAuthed, navigation }) => ({
        appName: Config.splash.appName,
        appDescription: Config.splash.appDescription,
        appSecondaryHeader: Config.splash.appSecondaryHeader,
        appSecondaryDescription: Config.splash.appSecondaryDescription,
        googlePlayURL: Config.splash.googlePlayURL,
        appStoreURL: Config.splash.appStoreURL,
        onWebPress: () => {
            const routeName = isAuthed
                ? Config.auth.alreadyAuthedRouteName
                : Config.auth.routeName;
            Navigation.navigate(routeName, navigation);
        },
    })),
)(Splash);
