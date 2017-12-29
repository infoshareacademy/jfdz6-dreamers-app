const GETEVENT_BEGIN = 'eventofaday/GETEVENT_BEGIN'
const GETEVENT_SUCCESS = 'eventofaday/GETEVENT_SUCCESS'
const GETEVENT_FAIL = 'eventofaday/GETEVENT_FAIL'

export const getEventOfADay = dayE => dispatch => {

    var today = new Date().toJSON().slice(0,10)
    var date = new Date()
    date.setDate(date.getDate() + 1)
    var tomorrow = date.toJSON().slice(0,10);
    console.log(today)
    console.log(tomorrow)



    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://planer.info.pl/api/rest/events.json?start_date='+today+'&end_date='+tomorrow+'&startTicket=10&limit=100';

    dispatch({ type: GETEVENT_BEGIN })
    return fetch(
        proxyUrl + targetUrl
    ).then(
        response => response.json()
    ).then(
        data => dispatch({ type: GETEVENT_SUCCESS, data })
    ).catch(
        error => dispatch({ type: GETEVENT_FAIL, error })
    )
}

const initialState = {
    data: null,
    getting: false,
    error: null
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GETEVENT_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GETEVENT_SUCCESS:
            return {
                ...state,
                data: action.data,
                getting: false
            }
        case GETEVENT_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        default:
            return state
    }
}