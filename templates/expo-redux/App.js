import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import configureStore from '@store/configure';
import { PersistGate } from 'redux-persist/lib/integration/react';
import NavigationView from '@navigation/NavigationView';

const { store, persistor } = configureStore();

// TODO:(tk) modify NavigationView `initialRouteName` param 
const App = () => (
    <Provider store={store}>
        <PersistGate
            loading={<Expo.AppLoading />}
            persistor={persistor}
        >
            <NavigationView initialRouteName='Feed' />
        </PersistGate>
    </Provider>
);

export default App;
