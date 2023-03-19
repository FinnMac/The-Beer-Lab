// src/reducers/alertReducer.js

// v 1.0
// Finn McCarthy

// This file holds the state and reducer for our alerts

import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const intialState = [];

export default function alertReducer(state = intialState, action){
  const { payload, type } = action;
  switch(type){
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};