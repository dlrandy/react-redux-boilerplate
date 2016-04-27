import 'babel-polyfill';

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

// module.exports =

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: '期货圈',
    description: '期货圈.',
  },
}, environment);
