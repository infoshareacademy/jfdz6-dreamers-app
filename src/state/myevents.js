import firebase from 'firebase'


const GET_BEGIN = 'events/GET_BEGIN'
const GET_SUCCESS = 'events/GET_SUCCESS'
const GET_FAIL = 'events/GET_FAIL'

export const getEvents = ( dateFrom, dateTo ) => dispatch => {
    // let urltest = 'http://planer.info.pl/api/rest/events.json?start_date='+day+'&limit=12';
    //   console.log('Od : ',dateFrom.toJSON().slice(0,10));
    //   console.log('Do : ', dateTo.toJSON().slice(0,10));


    //console.log('Od : ',dateFrom.toJSON().slice(0,10));
    //console.log('Do : ', dateTo.toJSON().slice(0,10));




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
        targetUrl = 'http://planer.info.pl/api/rest/events.json?&limit=250';
    //   console.log('link', targetUrl)
    dispatch({ type: GET_BEGIN })


    return fetch(
        proxyUrl + targetUrl
    ).then(
        response => response.json()
    ).then(
        data => dispatch({ type: GET_SUCCESS, data,dateFrom,dateTo })
    ).catch(
        error => dispatch({ type: GET_FAIL, error })
    )
}



const initialState = {
    data: null,
    getting: false,
    error: null,
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
                dateFrom: action.dateFrom,
                dateTo: action.dateTo
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