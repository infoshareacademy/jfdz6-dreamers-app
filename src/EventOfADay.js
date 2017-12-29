import React, {Component} from 'react';
import {connect} from 'react-redux'

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

    state = {
        eventofaday: []
    }

    componentDidMount() {
        this.props.getEventOfADay('a')
    }

    render() {
        return (
            <div>
                <h2>Event of a day</h2>
                <hr/>
                <h4>Nazwa wydarzenia</h4>
                <Col xs={12} sm={6} className="EventOfADay_image">
                </Col>
                <Col xs={12} sm={6} className="EventOfADay_info">
                    <p>Start: ???</p>
                    <p>Koniec: ???</p>
                    <p>Miejsce: ???</p>
                    <p>Płatne: ???</p>
                </Col>
                <Clearfix></Clearfix>
                <Col>
                    <p>Opis wydarzenia</p>
                    <p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                        ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum</p>
                </Col>
                <Col xs={12}>
                    <Col xs={12} sm={6}>
                        <p>Liczba osób, która zapisała się na wydarzenie</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Button bsStyle="success">Zapisz wydarzenie</Button>
                    </Col>
                </Col>

                {/*below listing all events*/}
                <Col xs={12} align="left">
                    <ol>
                        {
                            (this.props.eventofaday.data || []).map(
                                event =>
                                    // event.startDate === dateToday ?
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
) (EventOfADay)