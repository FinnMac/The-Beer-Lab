// /src/reducers/authReducer.js

// v 1.0
// Finn McCarthy

// This file holds the state and reducers that will deal with our auth.
// Reducer has State, and the reducers to give us the new state.
// import types
import {
  AUTH_ERROR,
  ACCOUNT_DELETED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGOUT
} from '../actions/types';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  user: null
}

export default function authReducer(state = intialState, action){
  switch(action.type){
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        loading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {  
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: true,
        user: null
      };
    default:
      return state;
  }
}