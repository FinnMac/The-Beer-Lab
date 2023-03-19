// Store.js
// This is our state for our application
import { createStore, applyMiddleware} from 'redux';
// this allows us to create our store, and add in any middleware

// this will allow our browser to be connected to redux.
// composeWithDevToolsDevelopmentOnly
import { composeWithDevTools } from '@redux-devtools/extension';
// import thunk
import thunk from 'redux-thunk';
// rootReducer
import rootReducer from './reducers/rootReducer';
// create our initial state
const initialState = {};
// create our middleware array
const middleware = [thunk];

// Createstore
// take 3 parameters.
// A reducer, the intitalSate, enhancers

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;