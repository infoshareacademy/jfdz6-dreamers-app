const GET_BEGIN = 'events/GET_BEGIN'
const GET_SUCCESS = 'events/GET_SUCCESS'
const GET_FAIL = 'events/GET_FAIL'

export const getEvents = day => dispatch => {
    day = new Date(day.toJSON().slice(0,10)
    let urltest = 'http://planer.info.pl/api/rest/events.json?start_date='+day+'&limit=12';
    console.log('url',urltest)
    dispatch({ type: GET_BEGIN })
    fetch(
        urltest, {mode: 'no-cors'}
    ).then(
        response => response.json()
    ).then(
        data => dispatch({ type: GET_SUCCESS, data })
    ).catch(
        error => dispatch({ type: GET_FAIL, error })
    )
}

const initialState = {
    data: null,
    getting: false,
    error: null
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
                getting: false
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