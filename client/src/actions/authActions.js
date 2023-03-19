// /src/actions/authActions.js
// v 1.0
// Finn Mccarthy

// This file will hold all the actions for the auth.

// All the actions in this file rely on
// a try, catch block which tries the correct action,
// and if that fails, catches an error

import axios from 'axios';
import { setAlert } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// loadUser
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {

    dispatch({
      type: AUTH_ERROR
    });
  }
} // End of loadUser.

// Register a user
export const register = (user) => async dispatch => {
  try {
    const res = await axios.post('/api/users/new', user);
  
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {

    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    console.log(errors);
    dispatch({
      type: REGISTER_FAIL
    });
  }
} // End of register

// Login a user
export const login =  (details) => async dispatch => {
 try {
   const res = await axios.post('/api/auth', details);
   dispatch({
     type: LOGIN_SUCCESS,
     payload: res.data
   });

  dispatch(loadUser());

  dispatch(setAlert('You have logged in successfully', 'success'));

 } catch (error) {
    const errors = error.response.data.errors;
    // display each error.
    // errors.forEach.
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL
    });
 }
} // end of login

export const profile = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  }
  catch (error) {
    const errors = error.response.data.errors;
    // display each error.
    // errors.forEach.
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL
    });
 }

}
// Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
} // end of logout
