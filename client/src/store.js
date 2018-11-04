import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk, promise));

export default store;
