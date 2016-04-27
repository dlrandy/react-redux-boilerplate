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

app.use(compression());
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/static',Express.static(path.resolve(__dirname, '../static/')));
app.post('/api/', (req, res) => {
    console.log(req.body);
    res.end(JSON.stringify({"test": 'test API'}));
});
app.use((req, res) => {
    const history = createMemoryHistory(req.originalUrl);
    const store = createStore(history);

    function hydrateOnClient() {
        res.send('<!doctype html>\n' +ReactDOM.renderToString( < Html store = { store }/>));
    }
    hydrateOnClient();

});

if (config.port) {
    server.listen(config.port, (err) => {
        if (err) {
            console.log(err);
        }
        console.info('app listening port:' + config.port);
    });
}
