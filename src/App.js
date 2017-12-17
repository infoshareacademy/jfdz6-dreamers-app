import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {
    LinkContainer
} from 'react-router-bootstrap'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <Router>
                        <div>
                            <Navbar>
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

                </header>
            </div>
        );
    }
}

const Home = () => (
    <div>
        <h2>Dreamers</h2>
        <p>Karuzela, taka jak na stronie Dreamers</p>
        <p>1 slajd - wydarzenie dnia</p>
        <p>2 slajd - wyszukiwarka</p>
        <p>3 slajd - moje wydarzenia</p>
    </div>
)

const EventOfADay = () => (
    <div>
        <h2>Event of a day</h2>
        <p> Wydarzenie dnia a dokładnym opisem, jak na stronie Bubble</p>
    </div>
)

const SearchEvents = () => (
  <div>
      <h2>Search Events</h2>
      <p>Wyszukiwarka z filtrami</p>
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


export default App;
