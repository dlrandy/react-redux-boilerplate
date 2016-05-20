const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


const host = (process.env.HOST || 'localhost');
const port = parseInt(process.env.PORT, 10) + 1 || 8001;

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

const projectRootPath = path.resolve(__dirname, '');
const assetsPath = path.resolve(projectRootPath, './static/dist');

module.exports = {
	context: path.resolve(__dirname, '.'),
  progress: true,
	devtool: 'inline-source-map',
    entry: {
      main: [
      'babel-polyfill',//不加这个livereload不好使
      // 'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8001',
      'webpack/hot/only-dev-server',// 'only' prevents reload on syntax errors
      // 'webpack-hot-middleware/client?path=http://localhost:8001/__webpack_hmr',
        // path.resolve(__dirname,'.','./src/browser.js')
        './src/browser.js'
      ],
    },
    output: {
      path: assetsPath,
       context: path.resolve(__dirname, '..'),
      filename: '[name]-[hash].js',//'[name].js',//
      chunkFilename: '[name]-[chunkhash].js',
      //这个路径如果指向了8000的话，会报main.js的语法错误，页面是空白的
      publicPath:'http://localhost:8001/'//dist/'//如果使用的是sourcemap，那么这里就得是绝对的路径 http://stackoverflow.com/questions/30762323/webpack-must-i-specify-the-domain-in-publicpath-for-url-directive-to-work-in
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, loaders: ['react-hot','babel'], include: path.join(__dirname, 'src')},
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap' },
        { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.(webm|mp4)$/, loader: 'file' },
         { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
      ]
    },
    progress: true,
    postcss: () => {
      return [ autoprefixer({ browsers: [ 'last 3 versions' ] }) ];
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: [ '', '.json', '.js', '.jsx' ]
    },
    resolveLoader: {
      modulesDirectories: [
        'src',
        'node_modules'
      ]
    },
    plugins: [
      // hot reload
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.IgnorePlugin(/webpack-assets\.json$/),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
      }),
      webpackIsomorphicToolsPlugin.development()
    ]
};

































