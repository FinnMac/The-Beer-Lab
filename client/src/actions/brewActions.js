//  src/actions/brewActions.js
// v 1.0
// Finn Mccarthy

// This file holds all the actions for brews.

// One action in this file rely on
// a try, catch block which tries the correct action,
// and if that fails, catches an error

import {
  GET_BREWS,
  GET_BREW,
  ADD_BREW,
  UPDATE_BREW,
  DELETE_BREW,
  DEL_ERROR
} from './types';
import axios from 'axios';

// getBrews
export const getBrews = () => async dispatch => {
  // call to the api
  const res = await axios.get('/api/s/brews');
  // dispatch action and payload to reducer
  // this will update state
  dispatch({
    type: GET_BREWS,
    payload: res.data
  });
};

export const getBrew = (id) => async dispatch => {
  const res = await axios.get(`/api/s/brew/${id}`);
  dispatch({
    type: GET_BREW,
    payload: res.data
  });
};

export const addBrew = brew => async dispatch => {
  const headers = {headers:{
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }}

  const res = await axios.post('/api/s/brew/add', brew, headers);
  dispatch({
    type: ADD_BREW,
    payload: res.data
  });
};

export const updateBrew = (brew) => async dispatch => {
  console.log("US id: " + brew.get('BREW_id'));
  const brewId = brew.get('BREW_id');
  const headers = {headers:{
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
}
  const res = await axios.put(`/api/s/brew/edit/${brewId}`, brew, headers);
  console.log(res.data)
  console.log('after')
  
  dispatch({
    type: UPDATE_BREW,
    payload: res.data
  });
};

export const deleteBrew = (id) => async dispatch => {
  console.log('DS id:' + id);
  try {
    await axios.delete(`/api/s/brew/${id}`);

    dispatch({
      type: DELETE_BREW,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: DEL_ERROR,
      payload: error
    });
  };
};

// This is the function to order the data
// a certain way for personalisation
export const getTitleASC = () => async dispatch => {
  const res = await axios.get('/api/s/brews/titleASC');
  dispatch({
    type: GET_BREWS,
    payload: res.data
  });
};

export const get3newest = () => async dispatch => {
  const res = await axios.get('/api/s/brews/3newest');
  dispatch({
    type: GET_BREWS,
    payload: res.data
  });
};