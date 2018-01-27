import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'

import {
    Grid,
    Row,
    Col,
    Carousel,
    Button,
    Well,
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

    componentDidMount(){
        this.props.getEventOfADay('a');
    }


    componentWillReceiveProps(nextProps) {
        const {eventofaday} = nextProps; //destructuring

        if (eventofaday.data && eventofaday.data.length > 0) {
            const maximumVipTicketPrice = eventofaday.data.reduce(
                (max, event) =>
                    parseInt(event.tickets.endTicket,10) > max ?
                        parseInt(event.tickets.endTicket,10) : max
                , 0)
            const myBestEvent = (eventofaday.data)
                .filter(
                    event =>
                        (event.tickets.endTicket >= maximumVipTicketPrice) && (event.attachments.length > 0)
                );
            if (myBestEvent.length > 0) {
                this.setState({
                    maximumPriceToday: maximumVipTicketPrice,
                    bestEvent: myBestEvent
                })
            } else {
                this.setState({
                    maximumPriceToday: 0,
                    bestEvent: eventofaday.data
                        .filter(
                            event =>
                                event.attachments.length > 0
                        )
                })
            }
        }
    }


    render() {
        const bestEvent = this.state.bestEvent && this.state.bestEvent[0]; //destructuring
        return (
            <Grid>
                <Row className="show-grid">
                    <h2>Wydarzenie Dnia</h2>
                </Row>

                <Row className="show-grid">
                    {
                        this.state.error && <p>{this.state.error.message}</p>
                    }

                    {
                        this.props.eventofaday.getting && <p>Getting events...</p>
                    }
                </Row>

                {bestEvent &&
                <div className="EventOfADay_main">
                    <Row className="show-grid">
                        <h3>{bestEvent.name}</h3>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={9}>
                            <a href={bestEvent.urls.www}>
                                <Carousel controls={false} indicators={false}>
                                    {
                                        (bestEvent.attachments)
                                            .map(
                                                attachment =>
                                                    <Carousel.Item>
                                                        <img src={attachment.fileName} alt=""
                                                             className="responsive, EventOfADay_image"/>
                                                    </Carousel.Item>
                                            )
                                    }
                                </Carousel>
                            </a>
                        </Col>
                        <Col xs={12} sm={12} md={3} className="EventOfADay_info">
                            <Well style={{"background": "transparent", "border": "1px solid rgb(250, 175, 24)"}} bsSize="large" className="transparent">
                                <p>Start: {moment(bestEvent.startDate).format('H:mm')}</p>
                                <p>Koniec: {moment(bestEvent.endDate).format('H:mm')}</p>
                                <p>Miejsce: {bestEvent.place.name}</p>
                                <p>{bestEvent.place.subname}</p>
                                {bestEvent.tickets.type === 'tickets' ?
                                    <p>Płatne:&nbsp;
                                        {bestEvent.tickets.startTicket}
                                        &nbsp;-&nbsp;
                                        {bestEvent.tickets.endTicket}
                                        &nbsp;PLN
                                    </p> :
                                    <p>Bezpłatne</p>
                                }
                            </Well>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col className="text-left EventOfADay_describe">
                            <p>{bestEvent.descLong.replace(/<[^>]*>/g, ' ')}</p>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={12}>
                            <Col xs={12} sm={6}>
                                <p>Liczba osób, która zapisała się na wydarzenie: 0</p>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Button bsStyle="success">Zapisz wydarzenie</Button>
                            </Col>
                        </Col>
                    </Row>
                </div>
                }
            </Grid>
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
