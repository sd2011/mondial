import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <App />
  </Provider>,
 document.getElementById('root'));
