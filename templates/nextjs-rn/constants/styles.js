import { Platform } from 'react-native';

const whiteColorWithAlpha = (alpha) => `rgba(255, 255, 255, ${alpha})`;

const primaryColorWithAlpha = (alpha) => `rgba(52, 73, 94, ${alpha})`;
const primaryColor = primaryColorWithAlpha(1);
const secondaryColor = '#3498db';

const defaultBackgroundColor = '#EDEDED';

export const ProgressBarStyles = {
    color: secondaryColor,
};

export const RetryViewStyles = {
    backgroundColor: '#D0021B',
    borderColor: '#D0021B',
    textColor: 'white',
    buttonBackgroundColor: 'rgba(0, 0, 0, 0.2)',
    buttonTextColor: 'white',
};

export const NavigationStyles = {
    backgroundColor: primaryColor,
    titleColor: 'white',
    tintColor: 'white',
    buttonBackgroundColor: 'white',
    borderBottomColor: '#EDEDED',
    defaultStyle: {
        backgroundColor: primaryColor,
        borderBottomColor: '#EDEDED',
    },
};

export const StatusNotificationStyles = {
    danger: {
        backgroundColor: '#D0021B',
    },
    success: {
        backgroundColor: '#27ae60',
    },
};

export const SplashStyles = {
    layout: {
        largeMinWidth: 800,
        sideContainerMaxWidth: 500,
    },
    rightContainerBackgroundColor: primaryColor,
};

export const AuthStyles = {
    large: {
        backgroundColor: defaultBackgroundColor,
        inputTextColor: 'black',
        inputPlaceholderTextColor: '#aaa',
        inputBorderColor: '#ddd',
        inputContainerBackgroundColor: 'white',
        nextButtonColor: primaryColor,
        inputHeaderSeparatorColor: 'black',
    },
    small: {
        backgroundColor: primaryColor,
        inputTextColor: 'white',
        inputPlaceholderTextColor: whiteColorWithAlpha(0.65),
        inputBorderColor: whiteColorWithAlpha(0.65),
        nextButtonColor: whiteColorWithAlpha(0.05),
    },
};

// Universal styles
export const AppStyles = {
    primaryColor,
    primaryColorWithAlpha,
    secondaryColor,

    defaultBackgroundColor: defaultBackgroundColor,

    fonts: {
        defaultFontName: (() => {
            switch (Platform.OS) {
            case 'ios': return 'HelveticaNeue';
            case 'android': return '"Helvetica Neue", HelveticaNueue, Helvetica, Arial, sans-sarif';
            case 'web': return 'HelveticaNeue';
            }
        })(),
    },
    layout: {
        maxMobileListWidth: 600,
    },
};
