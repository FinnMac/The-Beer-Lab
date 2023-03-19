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
  GET_HYDROMETER
} from './types';

// loadUser
export const postToken = () => dispatch => {
  
axios.get('/api/api').then((response) => {
      dispatch({
        type: GET_HYDROMETER,
        payload: response.data
      });

}).catch((error) => {
    dispatch(setAlert('You have called the api more than 5 times in under a minute. Please wait a minute before calling it again', 'danger'));
    console.error(error)
});

}

export const sendEmail = (message) => dispatch => {
  console.log(message)
  const res = axios.post('/api/api/email',message)
        dispatch(setAlert('Email sent successfully!', 'success'));
  
  }
