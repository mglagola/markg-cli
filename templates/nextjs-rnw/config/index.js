export default {
    web: {
        defaultHtmlTitle: '{{name}}',
        googleAnalyticsId: null,
        prodApiURL: '',
        devApiURL: '',
    },
    reduxPersist: {
        whitelist: [''],
    },
    splash: {
        appName: '{{name}}',
        appDescription: '{{description}}',
        appSecondaryHeader: '',
        appSecondaryDescription: '',
        googlePlayURL: 'https://google.com',
        appStoreURL: 'https://google.com',
        webAppRouteName: 'Splash',
    },
    routes: {
        Splash: {
            screen: null,
            path: '/',
        },
    },
};
