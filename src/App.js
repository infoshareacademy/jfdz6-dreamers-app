import React, {Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar'

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
                  <AppNavbar/>
                </header>
            </div>
        );
    }
}

export default App;
