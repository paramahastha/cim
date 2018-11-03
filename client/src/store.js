import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, promise, logger));

export default store;
