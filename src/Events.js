import React from 'react'
import {connect} from 'react-redux'
import {getEvents} from './state/events'
import DatePicker from 'react-date-picker'

class Events extends React.Component {
    state = {
        events: [],
        deleting: false,
        error: null,
        dateFrom: null,
        dateTo: new Date(+new Date() + 86400000),
        selectedRadio: 'tickets'
    }

    componentDidMount() {
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

    handleRadioChange = (event) => {
        this.setState({
            selectedRadio: event.currentTarget.value
        })
    };

    render() {
        return (
            <div>
                <h1>Events</h1>
                <hr/>
                <DatePicker
                    onChange={this.onChange1}
                    value={this.state.dateFrom || new Date() }
                />
                <DatePicker
                    onChange={this.onChange2}
                    value={this.state.dateTo}
                />
                <hr/>

                <div className="radio-row">
                    <div className="input-row">
                        <input
                            type="radio"
                            name="free"
                            value="free"
                            checked={this.state.selectedRadio === 'free'}
                            onChange={this.handleRadioChange}
                        />
                        <label htmlFor="free">Darmowe</label>

                        <input
                            type="radio"
                            name="tickets"
                            value="tickets"
                            checked={this.state.selectedRadio === 'tickets'}
                            onChange={this.handleRadioChange}
                        />
                        <label htmlFor="tickets">Płatne</label>

                        <input
                            type="radio"
                            name="unknown"
                            value="unknown"
                            checked={this.state.selectedRadio === 'unknown'}
                            onChange={this.handleRadioChange}
                        />
                        <label htmlFor="unknown">Nie określone</label>
                    </div>
                </div>
            <hr/>
                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.events.getting && <p>Getting events...</p>
                }

                <ol>
                    {
                        (this.props.events.data || [])
                            .filter(event => event.tickets.type === this.state.selectedRadio)


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
