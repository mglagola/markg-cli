import {
    persistStore as _persistStore,
    persistCombineReducers as _persistCombineReducers,
} from 'redux-persist';
import { AsyncStorage, Platform } from 'react-native';

export const DEFAULT_PERSIST_CONFIG = {
    key: 'root',
    whitelist: Platform.OS === 'android'
        ? []  // TODO:(tk) enter in correct value
        : [], // TODO:(tk) enter in correct value
    storage: AsyncStorage,
};

export function persistStore (store, callback) {
    return _persistStore(store, callback);
}

export function persistCombineReducers (reducers, config = DEFAULT_PERSIST_CONFIG) {
    return _persistCombineReducers(config, reducers);
}
