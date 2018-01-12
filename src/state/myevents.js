import moment from 'moment'

const MYEVENTS_BEGIN = 'myevents/MYEVENTS_BEGIN'
const MYEVENTS_SUCCESS = 'myevents/MYEVENTS_SUCCESS'
const MYEVENTS_FAIL = 'myevents/MYEVENTS_FAIL'

export const getMyEvents = dayM => dispatch => {

    var today = moment().format('YYYY-MM-DD');
    var monthago = moment().add(-1, 'months').format('YYYY-MM-DD');



    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://planer.info.pl/api/rest/events.json?start_date='+monthago+'&end_date='+today+'&limit=1999';

    dispatch({ type: MYEVENTS_BEGIN })
    return fetch(
        proxyUrl + targetUrl
    ).then(
        response => response.json()
    ).then(
        data => dispatch({ type: MYEVENTS_SUCCESS, data })
    ).catch(
        error => dispatch({ type: MYEVENTS_FAIL, error })
    )
}

const initialState = {
    data: null,
    getting: false,
    error: null
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case MYEVENTS_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case MYEVENTS_SUCCESS:
            return {
                ...state,
                data: action.data,
                getting: false
            }
        case MYEVENTS_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        default:
            return state
    }
}