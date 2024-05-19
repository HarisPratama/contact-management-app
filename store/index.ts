import thunk from 'redux-thunk';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import contactReducer from './reducer/contact';

const reducers = combineReducers({
	contact: contactReducer,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
