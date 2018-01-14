import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  Carousel
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

import {
  LinkContainer
} from 'react-router-bootstrap'

import EventOfADay from './EventOfADay'
import SearchEvents from './Events'

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

          <hr/>

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
        <h2>Dreamers</h2>
        <p>Karuzela, taka jak na stronie Dreamers</p>
        <p>1 slajd - wydarzenie dnia</p>
        <p>2 slajd - wyszukiwarka</p>
        <p>3 slajd - moje wydarzenia</p>

        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="../img/image-fest1.jpg" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="/img/image-fest2.jpg" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="/img/image-fest3.jpg" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>


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