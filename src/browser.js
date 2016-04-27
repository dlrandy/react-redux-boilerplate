import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configure from './redux/create';
import { App, DevTools } from './containers';
import routes from './routes';
import { Router } from 'react-router';
import './containers/main.scss';
const store = configure();
const history = syncHistoryWithStore(browserHistory, store);
ReactDom.render(
	<Provider store={ store }>
	<div>
      <Router history={ history } routes={ routes(store) } />
      <DevTools />
     </div>
     </Provider>
, document.getElementById('content'));
