// src/actions/types.js
// This file contians all the action type we can dispatch and use in our application

// BREW actions
export const GET_BREWS = 'GET_BREWS';
export const GET_BREW = 'GET_BREW';
export const ADD_BREW = 'ADD_BREW';
export const DELETE_BREW = 'DELETE_BREW';
export const UPDATE_BREW = 'UPDATE_BREW';

// AUTH actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

// ALERT actions
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const DEL_ERROR = 'DEL_ERROR';

// API actions
export const GET_HYDROMETERS = 'GET_HYDROMETERS';
export const GET_HYDROMETER = 'GET_HYDROMETER';
export const POST_AUTH = 'POST_AUTH';