export default {
    web: {
        defaultHtmlTitle: '{{name}}',
        googleAnalyticsId: null,
        prodApiURL: '',
        devApiURL: 'http://localhost:3000',
    },
    native: {
        prodApiURL: 'http://localhost:3000',
        devApiURL: 'http://localhost:3000',
    },
    reduxPersist: {
        whitelist: ['Auth'],
    },
    splash: {
        appName: '{{name}}',
        appDescription: '{{description}}',
        appSecondaryHeader: '',
        appSecondaryDescription: '',
        googlePlayURL: 'https://google.com',
        appStoreURL: 'https://google.com',
    },
    routes: {
        Splash: {
            screen: null,
            path: '/',
        },
        Auth: {
            screen: 'Auth',
            statusBarStyle: 'light-content',
            path: ['/register', '/login'],
        },
    },
    auth: {
        routeName: 'Auth',
        alreadyAuthedRouteName: 'Splash',
    },
};
