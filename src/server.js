require('babel-polyfill');
require('es6-promise').polyfill();
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
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import http from 'http';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Html from './helpers/Html';
import createRoutes from './routes';


const app = new Express();
const server = new http.Server(app);
const targetUrl = 'http://192.9.169.135';
// for server rendering 
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});
// if (!config.isProduction) {
//     const compiler = webpack(webpackconfig);
//     const middleware = webpackDevMiddleware(compiler, {
//         publicPath: "http://locahost:8000/dist/",
//         contentBase: 'src',
//         hot: true,
//         stats: {
//             colors: true,
//             hash: false,
//             timings: true,
//             chunks: false,
//             chunkModules: true,
//             modules: false,
//         },
//         historyApiFallback: true,

//     });
//     app.use(middleware);

//     app.use(webpackHotMiddleware(compiler, {
//         log: console.log,
//         path: 'http://locahost:8000/__webpack_hmr',
//         heartbeat: 10 * 1000,
//     }));
// }

//这个代理一定要放在bodyparser之前，否则
//https://github.com/nodejitsu/node-http-proxy/issues/843
app.use('/api', (req, res) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
    proxy.web(req, res, {target: targetUrl+"/api/"});
});
proxy.on('error', (error, req, res) => {
  let json;
  console.error(error)
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use(compression());
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/static',Express.static(path.resolve(__dirname, '../static/')));



app.use((req, res) => {
    if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const guest = req.guest;
  const authed = req.token;
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~",webpackIsomorphicTools.assets())
  const memoryHistory = createMemoryHistory(req.url)
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

    function hydrateOnClient() {
        res.send('<!doctype html>\n' +ReactDOM.renderToString( <Html assets={webpackIsomorphicTools.assets()} store={ store } />));
    }
    // hydrateOnClient();
    match({ history, routes: createRoutes(store), location: req.url}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      console.log("1111111111111111111111111111111");
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR: on server');
      res.status(500);
      hydrateOnClient();
      console.log("22222222222222222222");
    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
       console.log("333333333333333333333333333333",renderProps, store)
        res.status(200);

        // global.navigator = {userAgent: req.headers['user-agent']};
        console.log('--------------',component, 'server rendering =====================>',component)
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      console.log("44444444444444444444444");
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
