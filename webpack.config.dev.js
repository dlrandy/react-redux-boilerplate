const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


const host = (process.env.HOST || 'localhost');
const port = parseInt(process.env.PORT, 10) + 1 || 8001;


module.exports = {
	context: path.resolve(__dirname, '.'),
	devtool: 'inline-source-map',
    entry: {
      main: [
      'babel-polyfill',//不加这个livereload不好使
      // 'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client?path=__webpack_hmr&reload=true',
        path.resolve(__dirname,'.','./src/browser.js')
      ],
      vendor: [
		 'react',
		 'react-dom',
		 'react-router',
		 'react-redux',
		 'redux',
		 'react-router-redux'
	  ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',//'[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath:'/dist/'
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')},
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.scss$/, loader: 'style!css!sass?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap' }
      ]
    },
    progress: true,
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
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
      // hot reload
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      // new webpack.IgnorePlugin(/webpack-assets\.json$/),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        "process.env": {
          BROWSER: JSON.stringify(true)
        }
      })
    ]
};

































