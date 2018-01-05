import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'

import {
    Button,
    Col,
    Clearfix
} from 'react-bootstrap'

import './EventOfADay.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {getEventOfADay} from './state/eventofaday'

class EventOfADay extends Component {

    constructor() {
        super();
        this.state = {
            eventofaday: [],
            maximumPriceToday: null,
            bestEvent: null
        }
    }

    componentDidMount() {
        this.props.getEventOfADay('a');
        if (this.props.eventofaday.data.length > 0) {
            const maximumStartPrice = this.props.eventofaday.data.reduce(
                (max, event) =>
                    parseInt(event.tickets.startTicket) > max ?
                        parseInt(event.tickets.startTicket) : max
                , 0)
            const myBestEvent = (this.props.eventofaday.data)
                .filter(
                    event =>
                        event.tickets.startTicket >= maximumStartPrice
                );
            console.log(myBestEvent)
            this.setState({
                maximumPriceToday: maximumStartPrice,
                bestEvent: myBestEvent
            })
        }
    }


    render() {
        return (
            <div>
                <h2>Event of a day</h2>
                <hr/>
                {this.state.bestEvent &&
                <div>
                    <h4>{this.state.bestEvent[0].name}</h4>
                    <Col xs={12} sm={6} className="EventOfADay_image">
                    </Col>
                    <Col xs={12} sm={6} className="EventOfADay_info">
                        <p>Start: {moment(this.state.bestEvent[0].startDate).format('H:mm')}</p>
                        <p>Koniec: {moment(this.state.bestEvent[0].endDate).format('H:mm')}</p>
                        <p>Miejsce:{this.state.bestEvent[0].place.name}</p>
                        <p>{this.state.bestEvent[0].place.subname}</p>
                        {this.state.bestEvent[0].tickets.type ?
                            <p>Płatne:&nbsp;
                                {this.state.bestEvent[0].tickets.startTicket}
                                &nbsp;-&nbsp;
                                {this.state.bestEvent[0].tickets.endTicket}
                                &nbsp;PLN
                            </p> :
                            <p>Bezpłatne</p>}
                    </Col>
                    <Clearfix></Clearfix>
                    <Col>
                        <p>Opis wydarzenia</p>
                        <p>{this.state.bestEvent[0].descLong}</p>
                    </Col>
                    <Col xs={12}>
                        <Col xs={12} sm={6}>
                            <p>Liczba osób, która zapisała się na wydarzenie</p>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Button bsStyle="success">Zapisz wydarzenie</Button>
                        </Col>
                    </Col>
                </div>
                }

                {/*below listing all events*/}
                <Col xs={12} align="left">
                    <ol>
                        {
                            (this.props.eventofaday.data || [])
                                .filter(
                                    event =>
                                        event.tickets.startTicket >= this.state.maximumPriceToday
                                )
                                .map(
                                    event =>
                                        (
                                            <li key={event.id}>
                                                {/*<p>{event.place}</p>*/}
                                                {/*<p>{event.endDate}</p>*/}
                                                <p>{event.name}</p>
                                                {/*<p>{event.urls}</p>*/}
                                                {/*<p>{event.attachments}</p>*/}
                                                {/*<p>{event.descLong}</p>*/}
                                                {/*<p>{event.categoryId}</p>*/}
                                                <p>{event.startDate}</p>
                                                {/*<p>{event.organizer}</p>*/}
                                                {/*<p>{event.active}</p>*/}
                                                <p>{event.tickets.startTicket
                                                + ' - '
                                                + event.tickets.endTicket}
                                                </p>

                                            </li>
                                        )
                                )
                        }
                    </ol>
                    <hr/>
                </Col>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    eventofaday: state.eventofaday
})

const mapDispatchToProps = dispatch => ({
    getEventOfADay: (dayE) => dispatch(getEventOfADay(dayE))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventOfADay)