import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  Carousel,
  Image,
  Grid,
  Row
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

import {
  LinkContainer
} from 'react-router-bootstrap'

import EventOfADay from './EventOfADay'
import SearchEvents from './Events'

import fest1 from './img/image-fest1.jpg';
import fest2 from './img/image-fest2.jpg';
import fest3 from './img/image-fest3.jpg';


const AppNavbar = () => (
      <Router>
        <div>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Dreamers</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>

              <LinkContainer to="/eventofaday">
                <NavItem>Wydarzenie dnia</NavItem>
              </LinkContainer>


              <LinkContainer to="/searchevents">
                <NavItem>Wyszukiwarka</NavItem>
              </LinkContainer>

              <LinkContainer to="/myevents">
                <NavItem>Moje wydarzenia</NavItem>
              </LinkContainer>

              <LinkContainer to="/logout">
                <NavItem>Wyloguj</NavItem>
              </LinkContainer>

            </Nav>
          </Navbar>


          <Route exact path="/" component={Home}/>
          <Route path="/eventofaday" component={EventOfADay}/>
          <Route path="/searchevents" component={SearchEvents}/>
          <Route path="/myevents" component={MyEvents}/>
          <Route path="/logout" component={Login}/>

        </div>
      </Router>
    )


    const Home = () => (
      <div>
        <h1>Trójmiejski Kalendarz Imprez</h1>
        <h3>Najlepsza wyszukiwarka - najlepsze Imprezy</h3>
<Grid>
  <Row>
        <Carousel>
          <Carousel.Item>
            <Image style={{margin:"0 auto"}} width={1200} src={fest1} responsive />
            <Carousel.Caption>
              <div style={{"background-color": "rgba(0,0,0,0.9)", padding: "0px"}}>
              <h2 style={{color: "rgb(250, 175, 24)"}}>Siedzisz w domu i zastanawiasz się co robić?</h2>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{margin:"0 auto"}} width={1200} src={fest2} responsive />
            <Carousel.Caption>
              <div style={{"background-color": "rgba(0,0,0,0.9)", padding: "0px"}}>
              <h2 style={{color: "rgb(250, 175, 24)"}}>Wyszukaj wydarzenia, które Cię interesują.</h2>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{margin:"0 auto"}} width={1200} src={fest3} responsive />
            <Carousel.Caption>
              <div style={{"background-color": "rgba(0,0,0,0.9)", padding: "0px"}}>
              <h2 style={{color: "rgb(250, 175, 24)"}}>Nie czekaj i z nami planuj!</h2>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
  </Row>
</Grid>

      </div>
    )


    const MyEvents = () => (
      <div>
        <h2>My events</h2>
        <p>Układ jak na stronie wyszukiwarki wydarzeń (z filtrami), plus przycisk umożliwiający usunięcie wydarzenia z listy moich wydarzeń</p>
      </div>
    )

    const Login = () => (
      <div>
        <h2>Logout</h2>
      </div>
    )


export default AppNavbar