
require('babel-register');
require('babel-polyfill');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
 

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: false,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}


// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools-configuration'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('../src/server');
  });