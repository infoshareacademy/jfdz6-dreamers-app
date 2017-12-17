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


ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
