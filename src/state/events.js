const GET_BEGIN = 'events/GET_BEGIN'
const GET_SUCCESS = 'events/GET_SUCCESS'
const GET_FAIL = 'events/GET_FAIL'

export const getEvents = ( dateFrom, dateTo ) => dispatch => {
   // let urltest = 'http://planer.info.pl/api/rest/events.json?start_date='+day+'&limit=12';
 //   console.log('Od : ',dateFrom.toJSON().slice(0,10));
 //   console.log('Do : ', dateTo.toJSON().slice(0,10));

    if(dateFrom===null){
        dateFrom = new Date();
    }
    else{
        dateFrom = new Date(+dateFrom + 86400000)
    }
    if(dateTo===null){
        dateTo = new Date()
    }
    else{
        dateTo = new Date(+dateTo + 86400000)
    }
    if(dateTo.getTime() < dateFrom.getTime()){
        dateTo = new Date(+dateFrom + 86400000)
    }
    //console.log('Od : ',dateFrom.toJSON().slice(0,10));
    //console.log('Do : ', dateTo.toJSON().slice(0,10));



    dateFrom = dateFrom.toJSON().slice(0,10);
    dateTo = dateTo.toJSON().slice(0,10);


    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://planer.info.pl/api/rest/events.json?start_date='+dateFrom+'&end_date='+dateTo+'&limit=250';
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