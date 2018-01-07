import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'

import {
    Button,
    Col,
    Clearfix,
    Carousel,
} from 'react-bootstrap'

import './EventOfADay.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {getEventOfADay} from './state/eventofaday'

class EventOfADay extends Component {

    state = {
        eventofaday: [],
        maximumPriceToday: null,
        bestEvent: null
    }


    componentDidMount() {
        const {eventofaday} = this.props; //destructuring
        this.props.getEventOfADay('a');
        if (eventofaday.data.length > 0) {
            const maximumVipTicketPrice = eventofaday.data.reduce(
                (max, event) =>
                    parseInt(event.tickets.endTicket) > max ?
                        parseInt(event.tickets.endTicket) : max
                , 0)
            const myBestEvent = (eventofaday.data)
                .filter(
                    event =>
                        event.tickets.endTicket >= maximumVipTicketPrice
                );
            console.log(myBestEvent)
            this.setState({
                maximumPriceToday: maximumVipTicketPrice,
                bestEvent: myBestEvent
            })
        }
    }

    render() {
        const bestEvent = this.state.bestEvent && this.state.bestEvent[0]; //destructuring
        return (
            <div>
                <h2>Event of a day</h2>
                <hr/>
                {bestEvent &&
                <div>
                    <h3>{bestEvent.name}</h3>
                    <Col xs={12} sm={6}>
                        <a href={bestEvent.urls.www}>
                            <Carousel controls={false} indicators={false}>
                                {
                                    (bestEvent.attachments)
                                        .map(
                                            attachment =>
                                                <Carousel.Item>
                                                    <img src={attachment.fileName}/>
                                                </Carousel.Item>
                                        )
                                }
                            </Carousel>
                        </a>
                    </Col>
                    <Col xs={12} sm={6} className="EventOfADay_info">
                        <p>Start: {moment(bestEvent.startDate).format('H:mm')}</p>
                        <p>Koniec: {moment(bestEvent.endDate).format('H:mm')}</p>
                        <p>Miejsce: {bestEvent.place.name}</p>
                        <p>{bestEvent.place.subname}</p>
                        {bestEvent.tickets.type ?
                            <p>Płatne:&nbsp;
                                {bestEvent.tickets.startTicket}
                                &nbsp;-&nbsp;
                                {bestEvent.tickets.endTicket}
                                &nbsp;PLN
                            </p> :
                            <p>Bezpłatne</p>
                        }
                    </Col>
                    <Clearfix></Clearfix>
                    <Col>
                        <p>Opis wydarzenia</p>
                        <p>{bestEvent.descLong}</p>
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