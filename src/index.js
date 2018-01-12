import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';
import store from './store'
import Auth from './Auth'
import registerServiceWorker from './registerServiceWorker';
// import Provider from "react-redux/es/components/Provider";


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
