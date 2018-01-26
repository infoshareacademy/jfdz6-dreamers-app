import React from 'react'
import {connect} from 'react-redux'
import {getEvents} from './state/events'
import DatePicker from 'react-date-picker'
import {
    Grid,
    Row,
    Col,
    Image,
    Well,
} from 'react-bootstrap'

import './Events.css'

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
            <Grid>
                <Row className="show-grid">
                    <h1>Wydarzenia</h1>
                </Row>

                <Row className="show-grid Events_filters">
                    <Col xs={12} sm={12} md={3} lg={3}>
                        <h2 className="Events_filters_title">Filtry wyświetlania</h2>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className="Events_date">
                        <h4> Wybierz zakres dat:</h4>
                        <p>Od:
                            <DatePicker
                                onChange={this.onChange1}
                                value={this.state.dateFrom || new Date()}
                            />
                        </p>
                        <p>Do:
                            <DatePicker
                                onChange={this.onChange2}
                                value={this.state.dateTo}
                            />
                        </p>
                    </Col>
                    <Col xs={12} sm={12}  md={3} lg={3} className="Events_ticket">
                        {/*<Well >*/}
                        <h4> Wybierz typ biletu:</h4>
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
                            </div>
                            <div className="input-row">
                                <input
                                    type="radio"
                                    name="tickets"
                                    value="tickets"
                                    checked={this.state.selectedRadio === 'tickets'}
                                    onChange={this.handleRadioChange}
                                />
                                <label htmlFor="tickets">Płatne</label>
                            </div>
                            <div className="input-row">
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
                        {/*div                         </Well>*/}
                    </Col>
                </Row>
                <Row className="show-grid">
                    {
                        this.state.error && <p>{this.state.error.message}</p>
                    }

                    {
                        this.props.events.getting && <p>Getting events...</p>
                    }
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        {
                            (this.props.events.data || [])
                                .filter(event => event.tickets.type === this.state.selectedRadio)
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
            </Grid>
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


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events)
