// import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';

// export const store = configureStore({
//   reducer: {
//     todo: todoReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import todoReducer from './slice/todoSlice';
import authReducer from './slice/authSlice';
import apiReducer from './slice/apiSlice';
import dataReducer from './reducers/apiReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
  api: apiReducer,
  dataReducer: dataReducer,
});

const persistConfigData = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<any, any>(
  persistConfigData,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
