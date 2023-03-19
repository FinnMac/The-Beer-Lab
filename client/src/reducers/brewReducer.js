// src/reducers/serviceReducer.js

// v 1.0
// Finn McCarthy

// This file holds state and reducers that will deal with brews.

import {
  GET_BREWS,
  GET_BREW,
  ADD_BREW,
  UPDATE_BREW,
  DELETE_BREW,
  DEL_ERROR
} from '../actions/types';

const intialState = {
  brews: [],
  brew: {},
  erorrs: {}
}

export default function serviceReducer(state = intialState, action){
  switch(action.type){
    case GET_BREWS:
      return {
        ...state,
        brews: action.payload,
        // returns current state plus new brews array.
      }
      case GET_BREW:
        return {
          ...state,
          brew: action.payload
          // return current state plus new brew.
      }
      case ADD_BREW:
      return {
        ...state,
        brews: [action.payload, ...state.brews],
        brew: action.payload
        // returns current state plus new brews array and a new brew.
      }
      case UPDATE_BREW:
        console.log(action.payload.BREW_id)
      return {
        ...state,
        brews: state.brews.map(brew => 
          brew.BREW_id === action.payload.BREW_id ?
          (brew = action.payload) : brew),
        brew: action.payload
        // returns current state plus new brews array and a new brew.
      }
      case DELETE_BREW:
      return {
        ...state,
        brews: state.brews.filter(
          brew => brew.BREW_id !== action.payload
        )
        // returns current state plus new brews array
      }
      case DEL_ERROR:
      return {
        ...state,
        errors: action.payload
        // returns current state plus new errors obejct
      }
    default:
      return state;
  }
}

// Note: reducers do not change state, we make a copy first and change the copy.
