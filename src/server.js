require('babel-polyfill');
import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './config';
import webpackconfig from '../webpack.config.dev';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import http from 'http';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Html from './helpers/Html';
import createRoutes from './routes';


const app = new Express();
const server = new http.Server(app);
const targetUrl = 'localhost';
// for server rendering 
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});
if (!config.isProduction) {
    const compiler = webpack(webpackconfig);
    const middleware = webpackDevMiddleware(compiler, {
        publicPath: "/dist/",
        contentBase: 'src',
        hot: true,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: true,
            modules: false,
        },
        historyApiFallback: true,

    });
    app.use(middleware);

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(compression());
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/static',Express.static(path.resolve(__dirname, '../static/')));
app.post('/api', (req, res) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
    proxy.web(req, res, {target: targetUrl});
});
app.get('/api', (req, res) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
    proxy.web(req, res, {target: targetUrl});
});
app.use((req, res) => {
    const history = createMemoryHistory(req.path);
    const store = createStore();
    function hydrateOnClient() {
        res.send('<!doctype html>\n' +ReactDOM.renderToString( <Html store={ store } />));
    }
    // hydrateOnClient();
    match({ history, routes: createRoutes(store) }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR: on server');
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        // global.navigator = {userAgent: req.headers['user-agent']};
        console.log('--------------',component, 'server rendering =====================>',ReactDOM.renderToString(<Html component={component} store={store}/>))
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});




if (config.port) {
    server.listen(config.port, (err) => {
        if (err) {
            console.log(err);
        }
        console.info('app listening port:' + config.port);
    });
}
