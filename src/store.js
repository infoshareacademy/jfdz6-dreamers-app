import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import events from './state/events'
import eventofaday from './state/eventofaday'
import myevents from './state/myevents'
import firebase from 'firebase'
import auth from './state/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRE7SYarcAshCQXphHS_EPnjm6OoIUOLo",
    authDomain: "andrzej-47624.firebaseapp.com",
    databaseURL: "https://andrzej-47624.firebaseio.com",
    projectId: "andrzej-47624",
    storageBucket: "andrzej-47624.appspot.com",
    messagingSenderId: "709238300800"
};
firebase.initializeApp(config);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    persistState([]/* config*/),
)

const reducer = combineReducers({
    auth,
    events,
    eventofaday,
    myevents
})

const store = createStore(
    reducer,
    enhancer
)

store.dispatch({ type: 'RESET' })

window.store = store

export default store