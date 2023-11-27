import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/app-navigator';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
