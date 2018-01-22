import React from 'react'
import {
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
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
import SignOutButton from './SignOutButton'

import fest1 from './img/image-fest1.jpg';
import fest2 from './img/image-fest2.jpg';
import fest3 from './img/image-fest3.jpg';

const AppNavbar = ({ user }) => (

    <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Dreamers</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                {
                    user &&
                    <LinkContainer to="/eventofaday">
                        <NavItem>Wydarzenie dnia</NavItem>
                    </LinkContainer>
                }

                <LinkContainer to="/searchevents">
                    <NavItem>Wyszukiwarka</NavItem>
                </LinkContainer>

                {
                    user &&
                    <LinkContainer to="/myevents">
                        <NavItem>Moje wydarzenia</NavItem>
                    </LinkContainer>
                }
            </Nav>
            <Nav pullRight>
                {
                    !user &&
                    <LinkContainer to="/signin">
                        <NavItem>Zaloguj</NavItem>
                    </LinkContainer>
                }
                {
                    !user &&
                    <LinkContainer to="/signup">
                        <NavItem>Zarejestruj</NavItem>
                    </LinkContainer>
                }
                {
                    user &&
                    <SignOutButton/>
                }
            </Nav>
        </Navbar>
    </div>
)


export   const Home = () => (
    <div>
        <h1>Trójmiejski Kalendarz Imprez</h1>
        <h3>Najlepsza wyszukiwarka - najlepsze Imprezy</h3>
        <Grid>
            <Row>
                <Carousel>
                    <Carousel.Item>
                        <Image style={{margin:"0 auto"}} width={1200} src={fest1} responsive />
                        <Carousel.Caption>
                            <div style={{"backgroundColor": "rgba(0,0,0,0.9)", padding: "0px"}}>
                                <h2 style={{color: "rgb(250, 175, 24)"}}>Siedzisz w domu i zastanawiasz się co robić?</h2>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{margin:"0 auto"}} width={1200} src={fest2} responsive />
                        <Carousel.Caption>
                            <div style={{"backgroundColor": "rgba(0,0,0,0.9)", padding: "0px"}}>
                                <h2 style={{color: "rgb(250, 175, 24)"}}>Wyszukaj wydarzenia, które Cię interesują.</h2>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{margin:"0 auto"}} width={1200} src={fest3} responsive />
                        <Carousel.Caption>
                            <div style={{"backgroundColor": "rgba(0,0,0,0.9)", padding: "0px"}}>
                                <h2 style={{color: "rgb(250, 175, 24)"}}>Nie czekaj i z nami planuj!</h2>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Grid>

    </div>
)

export const MyEvents = () => (
    <div>
        <h2>My events</h2>
        <p>Układ jak na stronie wyszukiwarki wydarzeń (z filtrami), plus przycisk umożliwiający usunięcie wydarzenia z listy moich wydarzeń</p>
    </div>
)

export default withRouter(connect(
    state => ({
            user: state.auth.data
        }
    ))(AppNavbar))