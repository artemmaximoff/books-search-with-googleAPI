import { rootReducer } from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddlewire from 'redux-thunk';


export const store = createStore(rootReducer, applyMiddleware(thunkMiddlewire))