import { StackActions, NavigationActions } from 'react-navigation';

const reset = (routeName, navigation) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName }),
        ],
    });
    navigation.dispatch(resetAction);
};

const navigate = (routeName, navigation) => {
    navigation.navigate(routeName);
};

const back = (navigation) => {
    navigation.pop();
};

export default {
    reset,
    navigate,
    back,
};
