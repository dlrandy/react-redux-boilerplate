const Express = require('express');
const webpack = require('webpack');

const config = require('./src/config');
const webpackConfig = require('./webpack.config.dev');
const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 8001;
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  //  proxy: {
  //    "*": "http://localhost:8000"
  // },
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

// const app = new Express();

// app.use(require('webpack-dev-middleware')(compiler, serverOptions));
// app.use(require('webpack-hot-middleware')(compiler));
var webpackDevServer = require('webpack-dev-server');
new webpackDevServer(webpack(webpackConfig), serverOptions)
.listen(8001, 'localhost', function(err, result){
  if(err){
    console.PluginError(err);
  }
  console.log('Webpack hot load server listening on port 8001' );
});
