import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session' // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from "./reducers/Reducers";

const persistConfig = {
    key: 'TagFlip',
    storage,
    blacklist: ['editableCorpus'],
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers)

// Create Redux store, intercepted by the thunk and logger middleware
const logger = createLogger({});
const initialState = undefined;
const store = createStore(persistedReducer, initialState, applyMiddleware(thunk, logger));

let persistor = persistStore(store)

export { store, persistor };