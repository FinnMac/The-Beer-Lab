// src/reducers/blogReducer.js

// v 1.0
// Finn McCarthy

// This file holds state and reducers that will deal with blogs.

import {
    GET_HYDROMETER
  } from '../actions/types';
  
  const intialState = {
    hydrometer: [],
    loading: true
  }
  
  export default function apiReducer(state = intialState, action){
    switch(action.type){
      case GET_HYDROMETER:
        return {
          ...state,
          hydrometer: action.payload,
          loading: false,
          
        }
        
      default:
        return state;
    }
  }
  
  // Note: reducers do not change state, we make a copy first and change the copy.
  