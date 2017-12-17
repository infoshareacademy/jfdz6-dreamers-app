import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import auth from './state/auth'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBXgXdy_JGGCjKyCMiMBi6kJyjMS09bBCo",
  authDomain: "dreamers-app.firebaseapp.com",
  databaseURL: "https://dreamers-app.firebaseio.com",
  projectId: "dreamers-app",
  storageBucket: "dreamers-app.appspot.com",
  messagingSenderId: "351013823342"
};
firebase.initializeApp(config);

const reducer = combineReducers({
  auth,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  persistState([]/* config*/),
)

const store = createStore(
  reducer,
  enhancer
)

store.dispatch({ type: 'RESET' })

window.store = store

export default store