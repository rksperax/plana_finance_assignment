import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';

import reducers from '../ducks';
import {persistReducer, persistStore} from 'redux-persist';
import {createSelectorHook} from 'react-redux';
import thunk from 'redux-thunk';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const rootReducer = combineReducers({...reducers});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector = createSelectorHook<RootState>();
