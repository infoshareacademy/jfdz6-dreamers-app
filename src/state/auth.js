import firebase from 'firebase'
import history from '../history'

const SET_USER = 'auth/SET_USER'
const ERROR = 'auth/ERROR'
const SIGN_OUT = 'auth/SIGN_OUT'

const initialState = {
    data: null,
    error: null,
}

let unsubscribe = null
export const enableSync = () => dispatch => {
    dispatch(disableSync())
    unsubscribe = firebase.auth().onAuthStateChanged(
        user => {
            dispatch({ type: SET_USER, data: user })
        }
    )
}

export const disableSync = () => dispatch => {
    if (unsubscribe !== null) {
        unsubscribe()
    }
}

export const signUp = (email, password) => dispatch => {
    firebase.auth().createUserWithEmailAndPassword(
        email,
        password
    ).catch(
        error => dispatch({ type: ERROR, error })
    )
}

export const signIn = (email, password, user) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(
        email,
        password
    )
        .catch(
        error => dispatch({ type: ERROR, error })
    )
}

export const signOut = () => dispatch => {
    firebase.auth().signOut()
        .catch(
        error => dispatch({ type: ERROR, error })
    )
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'RESET':
            return {
                ...state,
                error: null
            }
        case SET_USER:
            return {
                ...state,
                data: action.data,
                error: null,
                redirect: history.push('/')
            }
        case ERROR:
            return {
                ...state,
                error: action.error
            }
        case SIGN_OUT:
            return initialState
        default:
            return state
    }
}