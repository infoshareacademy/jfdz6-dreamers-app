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
        dateTo: new Date(+new Date() + 86400000),
        eventType: 'tickets'

    }

    componentDidMount() {
        console.log('mounts')
        this.props.getEvents(this.state.dateFrom, this.state.dateTo)
    }


    onChange1 = dateFrom => {
        this.setState(
            {dateFrom: dateFrom}
        )
        this.props.getEvents(dateFrom, this.state.dateTo)

    }
    onChange2 = dateTo => {
        this.setState(
            {dateTo: dateTo}
        )
        this.props.getEvents(this.state.dateFrom, dateTo)

    }
    onClickFilter(){
        console.log('this.state');
    }

    render() {
        //console.warn('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.props.events)
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

                <button onClick={this.onClickFilter}>Filtruj</button>

                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.events.getting && <p>Getting events...</p>
                }

                <ol>
                    {console.log('data',this.props.events.data)}
                    {
                        (this.props.events.data || [])
                            .filter(event => event.tickets.type === this.state.eventType)


                            .map(
                            event => (
                                <li
                                    key={event.id}
                                >
                                    <p>{event.name}</p>
                                    <p>{getDateNode(event)}</p>
                                    <a href={checkIfUrlExist(event)}>
                                        <img src={checkIfAttachmentExist(event)} alt='nothing' title="Image"/>
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
        events: state.events,
        dateFrom: state.dateFrom,
        dateTo: state.dateTo
    })

    const mapDispatchToProps = dispatch => ({
        getEvents: (dateFrom, dateTo) => dispatch(getEvents(dateFrom, dateTo))

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