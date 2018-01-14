import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import events from './state/events'
import eventofaday from './state/eventofaday'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    persistState([]/* config*/),
)

const reducer = combineReducers({
    events,
    eventofaday
})

const store = createStore(
    reducer,
    enhancer
)

store.dispatch({ type: 'RESET' })

window.store = store

export default store