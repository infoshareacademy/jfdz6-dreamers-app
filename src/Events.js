import React from 'react'
import {connect} from 'react-redux'
import {getEvents} from './state/events'
import DatePicker from 'react-date-picker'

class Events extends React.Component {
    state = {
        events: [],
        deleting: false,
        error: null,
        dateFrom: new Date(),
        dateTo: new Date(),

    }

    componentDidMount() {
        console.log('mounts')
        // this.props.getEvents(new Date())
    }


    onChange1 = dateFrom => {
        this.setState(
            {dateFrom}
        )
        // getEvents(dateFrom);
    }
    onChange2 = dateTo => {
        this.setState(
            {dateTo, ala:'makota'}
        )
        this.props.getEvents(dateTo)
    }



    render() {
        console.warn('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.props.events)
        return (
            <div>
                <h1>Events</h1>
                <DatePicker
                    onChange={this.onChange1}
                    value={this.state.dateFrom}
                />
                <DatePicker
                    onChange={this.onChange2}
                    value={this.state.dateTo}
                />
                <label><input type="checkbox" name="checkbox1"/>Darmowe</label>
                <label><input type="checkbox" name="checkbox2"/>Płatne</label>
                <label><input type="checkbox" name="checkbox3"/>Nie określone</label>


                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.events.getting && <p>Getting events...</p>
                }

                <ol>
                    {
                        (this.props.events.data || []).map(
                            event => (
                                <li
                                    key={event.id}
                                >
                                    <p>{event.name}</p>
                                    <p>{getDateNode(event)}</p>
                                    <a href={checkIfUrlExist(event)}>
                                        <img src={checkIfAttachmentExist(event)} title="Image"/>
                                    </a>
                                </li>
                            )
                        )
                    }
                </ol>
            </div>
    )
    }
    }

    const mapStateToProps = state => ({
        events: state.events
    })

    const mapDispatchToProps = dispatch => ({
        getEvents: (day) => dispatch(getEvents(day))

    })


    function  checkIfAttachmentExist(event) {
        if(event['attachments']['0']!==undefined){

        return "http://planer.info.pl/image/event/"+event['id']+"/"+event['attachments']['fileName'];
    }
        else{
        return "http://lorempixel.com/300/300/nightlife";
    }
    }

    function checkIfUrlExist(event){
        if(event['urls']['www']!==undefined){
        return event['urls']['www'];
    }
        else{
        return event['urls']['www'];
    }
    }
    function getDateNode(event) {
        return event['startDate'].substring(0, event['startDate'].length - 5).replace('T', ' Godzina: ');
    }


    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Events)