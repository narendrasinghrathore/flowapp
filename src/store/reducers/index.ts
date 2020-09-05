import { flowReducer } from './flow.reducer';
import { combineReducers } from 'redux';
export default combineReducers({ flow: flowReducer });