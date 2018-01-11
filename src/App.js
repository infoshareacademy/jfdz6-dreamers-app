import React, {Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

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
