import React, {Component} from 'react';
import './App.css';
import AppNavbar, {Home} from './AppNavbar'
import {
    Router,
    Route,
} from 'react-router-dom'
import history from './history'
import EventOfADay from './EventOfADay'
import SearchEvents from './Events'
import SignIn from './SignIn'
import SignUp from './SignUp'
import MyEvents from './MyEvents'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <div className="App">
                            <AppNavbar/>
                            <Route exact path="/" component={Home}/>
                            <Route path="/eventofaday" component={EventOfADay}/>
                            <Route path="/searchevents" component={SearchEvents}/>
                            <Route path="/myevents" component={MyEvents}/>
                            <Route path="/signIn" component={SignIn}/>
                            <Route path="/signUp" component={SignUp}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;