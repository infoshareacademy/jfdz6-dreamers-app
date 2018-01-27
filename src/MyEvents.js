import React from 'react'
import {connect} from 'react-redux'
import {getEvents} from './state/myevents'
import {saveEvent} from './state/myevents'
import firebase from 'firebase'

import {
    Grid,
    Row,
    Col,
    Image
} from 'react-bootstrap'

import './Events.css'
import {currentUser} from './state/auth'
import myevents from "./state/myevents";
class Events extends React.Component {
    state = {
        events: [],
        deleting: false,
        error: null,
    }

    componentDidMount() {
        this.props.getEvents()
        this.props.currentUser()
    }

/*
    componentWillReceiveProps(nextProps) {
        let data
        let savedEvents = []

        //console.log(data);

        // user uid HnsrGOy2TuOmU3bdWgkxlICGqlu2

        var promise1 = new Promise(function(resolve, reject) {
            let dbRefObject = firebase.database().ref().child('users')

            dbRefObject.on('value', snap => {

                data = Object.values(snap.val())
                console.log(data)
                resolve(data);
            } )
        });

        promise1.then(function(value) {
            console.log(data[0]);
            data[0]['events'].map( event => savedEvents.push(event))
            // expected output: "Success!"
            console.log(savedEvents)
        })


        const {eventofaday} = nextProps; //destructuring


        const myEvents = (myevents.data)
            .filter(
                event =>
                    (event.id.includes(savedEvents))
            );


    }


  */  render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <h1>Wydarzenia</h1>
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
                        {                            console.log('THIS IS DATA',this.props.auth.data)
                        }
                        {
                            (this.props.events.data || [])
                                .filter(
                                    event => (




                                        saveEvents.includes(event.id))
                                )
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
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getEvents: () => dispatch(getEvents()),
    currentUser: () => dispatch(currentUser())
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


function saveEvents() {
    let data
    let savedEvents = []

    //console.log(data);

    // user uid HnsrGOy2TuOmU3bdWgkxlICGqlu2

    var promise1 = new Promise(function(resolve, reject) {
        let dbRefObject = firebase.database().ref().child('users')

        dbRefObject.on('value', snap => {

            data = Object.values(snap.val())
     //       console.log(data)
            resolve(data);
        } )
    });

    promise1.then(function(value) {
      //  console.log(data[0]);
        data[0]['events'].map( event => savedEvents.push(event))
        // expected output: "Success!"
       // console.log(savedEvents)
    })



    return savedEvents;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events)
