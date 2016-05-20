require('babel-register');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
  app: {
    title: '期货圈',
    description: '期货圈.',
  },
}, environment);
