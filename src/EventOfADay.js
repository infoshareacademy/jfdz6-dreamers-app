import React, {Component} from 'react';

import {
  Button,
  Col,
  Clearfix
} from 'react-bootstrap'

import './EventOfADay.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class EventOfADay extends Component {
  render() {
    return(
    <div>

      <h2>Event of a day</h2>

      <hr/>
      <h4>Nazwa wydarzenia</h4>
      <Col  xs={12} sm={6} className="EventOfADay_image">
      </Col>
      <Col  xs={12} sm={6} className="EventOfADay_info">
        <p>Start: ???</p>
        <p>Koniec: ???</p>
        <p>Miejsce: ???</p>
        <p>Płatne: ???</p>
      </Col>
      <Clearfix></Clearfix>
      <Col>
        <p>Opis wydarzenia</p>
        <p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
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

    )
  }
}

export default EventOfADay