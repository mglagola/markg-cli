import { connect } from 'react-redux';
import F from 'lodash/fp';
import { withProps } from 'recompose';
import Splash from '../components/Splash';
import Navigation from '../navigation/navigation';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';
import Config from '../config';

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapActionCreators = {
};

export default F.compose(
    withStyleConstraintsOnResize(),
    connect(mapStateToProps, mapActionCreators),
    withProps(({ navigation }) => ({
        appName: Config.splash.appName,
        appDescription: Config.splash.appDescription,
        appSecondaryHeader: Config.splash.appSecondaryHeader,
        appSecondaryDescription: Config.splash.appSecondaryDescription,
        googlePlayURL: Config.splash.googlePlayURL,
        appStoreURL: Config.splash.appStoreURL,
        onWebPress: () => {
            const routeName = Config.splash.webAppRouteName;
            Navigation.navigate(routeName, navigation);
        },
    })),
)(Splash);
