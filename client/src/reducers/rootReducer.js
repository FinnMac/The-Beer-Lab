// src/reducers/rootReducer.js

// v 1.0
// Finn McCarthy

// This is where we combine all our reducers together

import { combineReducers} from 'redux';
import brewReducer from'./brewReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import apiReducer from './apiReducer';
export default combineReducers({
   brew: brewReducer,
   auth: authReducer,
  alert: alertReducer,
  api: apiReducer
});