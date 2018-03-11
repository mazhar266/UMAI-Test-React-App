import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allReducers from './index';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(logger));
    let persistor = persistStore(store);
    return {store, persistor};
}
