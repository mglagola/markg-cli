const webpack = require('webpack');

module.exports = {
    webpack (config, { isServer }) {
        config.plugins.push(new webpack.DefinePlugin({
            __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
        }));
        config.resolve = {
            ...config.resolve,
            // .web.js is for React Native Web.
            extensions: ['.web.js', '.js', '.json', 'jsx'],
        };
        return config;
    },
};
