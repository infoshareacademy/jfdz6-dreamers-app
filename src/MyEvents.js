import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from './state/myevents'
import {
    Grid,
    Row,
    Col,
    Image
} from 'react-bootstrap'

import './Events.css'


class MyEvents extends Component {
    state = {
        events: [],
        deleting: false,
        error: null,
    }

    componentDidMount() {
        this.props.getMyEvents()
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <h1>my events</h1>
                </Row>

                <Row className="show-grid">
                    <Col sm={8} smOffset={2} md={6} mdOffset={3}>

                        <Row className="show-grid">
                            <Col xs={12}>
                                {
                                    (this.props.data || [])
                                        .map(
                                            event => (
                                                <Col xs={12} sm={6} md={4} lg={3}>
                                                    <p
                                                        key={event.id}
                                                        className="Events_box">
                                                        <div className="Events_title">
                                                            <h4>{event.name}</h4>
                                                        </div>
                                                        <div className="Events_image">
                                                            <a href={checkIfUrlExist(event)}>
                                                                <Image src={checkIfAttachmentExist(event)} responsive
                                                                       className="Events_image_link"/>
                                                            </a>
                                                        </div>
                                                        <div className="Events_time">
                                                            <p>{`Data: ${getDateNode(event).slice(0, 10)} ${getDateNode(event).slice(11, -3)}`}</p>
                                                        </div>
                                                    </p>
                                                </Col>
                                            )
                                        )
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}


function checkIfAttachmentExist(event) {
    if (event['attachments']['0'] !== undefined) {

        return "http://planer.info.pl/image/event/" + event['id'] + "/" + event['attachments']['fileName'];
    }
    else {
        return "http://lorempixel.com/300/300/nightlife";
    }
}

function checkIfUrlExist(event) {
    if (event['urls']['www'] !== undefined) {
        return event['urls']['www'];
    }
    else {
        return event['urls']['www'];
    }
}

function getDateNode(event) {
    return event['startDate'].substring(0, event['startDate'].length - 5).replace('T', ' Godzina: ');
}


const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = dispatch => ({
    getMyEvents: () => dispatch(getMyEvents())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEvents)
