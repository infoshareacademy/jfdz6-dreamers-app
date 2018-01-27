import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import events from './state/events'
import eventofaday from './state/eventofaday'
import myevents from './state/myevents'
import firebase from 'firebase'
import auth,  { enableSync } from './state/auth'
import history from "./history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXgXdy_JGGCjKyCMiMBi6kJyjMS09bBCo",
    authDomain: "dreamers-app.firebaseapp.com",
    databaseURL: "https://dreamers-app.firebaseio.com",
    projectId: "dreamers-app",
    storageBucket: "dreamers-app.appspot.com",
    messagingSenderId: "351013823342"
};
firebase.initializeApp(config);

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    persistState(['auth'], { key: 'JFDZ6' }),
)

const reducer = combineReducers({
    auth,
    events,
    eventofaday,
    myevents,
    history
})

const store = createStore(
    reducer,
    enhancer,
)

store.dispatch({ type: 'RESET' })
store.dispatch(enableSync())

window.store = store

export default store