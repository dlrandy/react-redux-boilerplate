import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'

import { Provider } from 'react-redux';
import configure from './redux/create';
import { App, DevTools } from './containers';
import routes from './routes';
import { Router } from 'react-router';
import './containers/main.scss';

const store = configure(browserHistory,window.__data);
const history = syncHistoryWithStore(browserHistory, store);
ReactDom.render(
	<Provider store={ store } key="provider">
	<div>
      <Router history={ history } render={ (props) =>
        <ReduxAsyncConnect {...props} filter={item => !item.deferred} />} >
      { routes(store)}
      </Router>

      <DevTools />
     </div>
     </Provider>
, document.getElementById('content'));
