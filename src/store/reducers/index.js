
import { combineReducers } from "redux";
import { bookSearchReducer } from './bookSearchreducer'


export const rootReducer = combineReducers({
    state: bookSearchReducer,
})
