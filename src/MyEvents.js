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

import {getMyEvents} from './state/myevents'
import myevents from "./state/myevents";

class MyEvents extends Component {

    state = {
        myevents: [],
        maximumPriceToday: null,
        personalEvents: null
    }

    componentWillMount() {
        const {myevents} = this.props; //destructuring
        this.props.getMyEvents('a');
        console.log(myevents)
    //     const myEvents = (myevents.data)
    //          .filter(
    //             event =>
    //                 (true)
    //         );
    //      console.log(myEvents)
    //     this.setState({
    //         personalEvents: myEvents
    //     })
    }

    render() {
        const myPersonalEvents = this.state.personalEvents && this.state.personalEvents[0]; //destructuring
        return (
            <Grid>
                <Row className="show-grid">
                    <h2>Event of a day</h2>
                    <hr/>
                </Row>

                {myPersonalEvents &&
                <div>
                    <Row className="show-grid">
                        <h3>{myPersonalEvents.name}</h3>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={12} sm={9}>

                            <a href={myPersonalEvents.urls.www}>
                                <Carousel controls={false} indicators={false} interval={3000}>
                                    {
                                        (myPersonalEvents.attachments)
                                            .map(
                                                attachment =>
                                                    <Carousel.Item>
                                                        <img src={attachment.fileName}
                                                             className="responsive, EventOfADay_image"/>
                                                    </Carousel.Item>
                                            )
                                    }
                                </Carousel>
                            </a>
                        </Col>
                        <Col xs={12} sm={3} className="EventOfADay_info">
                            <Well bsSize="large">
                                <p>Start: {moment(myPersonalEvents.startDate).format('H:mm')}</p>
                                <p>Koniec: {moment(myPersonalEvents.endDate).format('H:mm')}</p>
                                <p>Miejsce: {myPersonalEvents.place.name}</p>
                                <p>{myPersonalEvents.place.subname}</p>
                                {myPersonalEvents.tickets.type === 'tickets' ?
                                    <p>Płatne:&nbsp;
                                        {myPersonalEvents.tickets.startTicket}
                                        &nbsp;-&nbsp;
                                        {myPersonalEvents.tickets.endTicket}
                                        &nbsp;PLN
                                    </p> :
                                    <p>Bezpłatne</p>
                                }
                            </Well>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col className="text-left EventOfADay_describe">
                            <p>{myPersonalEvents.descLong.replace(/<[^>]*>/g, ' ')}</p>
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
    myevents: state.myevents
})

const mapDispatchToProps = dispatch => ({
    getMyEvents: (dayM) => dispatch(getMyEvents(dayM))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEvents)
