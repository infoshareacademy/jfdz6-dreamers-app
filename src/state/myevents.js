import firebase from 'firebase'

const GET_BEGIN = 'myevents/GET_BEGIN'
const GET_SUCCESS = 'myevents/GET_SUCCESS'
const GET_FAIL = 'myevents/GET_FAIL'


const initialState = {
    data: null,
    getting: false,
    error: null,
}



export const getMyEvents = () => dispatch => {
//saving data
/*
    let ref = firebase.database().ref()
    var usersRef = ref.child("users");
    usersRef.set({
        damian: {
            events: [
                "44697",
                "45026"
            ]},
        andrzej: {
                events: [
                    "44697",
                    "45026"
                ]},
        przemek: {
            events: [
                "44397",
                "44226"
            ]}

            });
*/
    //console.log(firebase.auth())

    let data
    let savedEvents = []

    //console.log(data);

    // user uid HnsrGOy2TuOmU3bdWgkxlICGqlu2

    var promise1 = new Promise(function(resolve, reject) {
        let dbRefObject = firebase.database().ref().child('users')

        dbRefObject.on('value', snap => {

            data = Object.values(snap.val())
            console.log(data)
            resolve(data);
        } )
    });

    promise1.then(function(value) {
        console.log(data[0]);
        data[0]['events'].map( event => savedEvents.push(event))
        // expected output: "Success!"
        console.log(savedEvents)
    })



    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://planer.info.pl/api/rest/events.json?limit=100';

    dispatch({ type: GET_BEGIN })
    return fetch(
        proxyUrl + targetUrl
    ).then(
        response => response.json()
    /* ).then(
        toFilter => toFilter.filter( f => savedEvents.includes(f)) */
    ).then(
        data => dispatch({ type: GET_SUCCESS, data })
    ).catch(
        error => dispatch({ type: GET_FAIL, error })
    )
}

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case GET_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GET_SUCCESS:
            return {
                ...state,
                data: action.data,
                getting: false,
            }
        case GET_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        default:
            return state
    }
}