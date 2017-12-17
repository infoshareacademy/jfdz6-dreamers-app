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
import SignInUp from "./SignInUp";

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
                                    <LinkContainer exact to="/">
                                        <NavItem>Home</NavItem>
                                    </LinkContainer>

                                    <LinkContainer to="/about">
                                        <NavItem>About</NavItem>
                                    </LinkContainer>

                                </Nav>
                            </Navbar>

                            <hr/>

                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/sign-in-up" component={SignInUp}/>

                        </div>
                    </Router>

                </header>
            </div>
        );
    }
}

const Home = () => (
    <div>
        <h2>Home AWESO</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
        <h1>Mwahahaha</h1>
        <p>I know props</p>

    </div>
)

export default App;
