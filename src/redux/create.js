import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';//这里我们并没用thunk中间件
import DevTools from '../containers/DevTools';
import promise from 'redux-promise';
import { routerMiddleware } from 'react-router-redux';


export default function configure(history,__data) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const logger = createLogger();
  const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(logger),
  applyMiddleware(promise),
  applyMiddleware(reduxRouterMiddleware),
  DevTools.instrument())(createStore);

  const store = finalCreateStore(rootReducer, __data);

     if (module.hot) {
	    module.hot.accept('./reducers/index', () => {
        let nextReducer = require('./reducers/index');
        store.replaceReducer(nextReducer);
	    });
     }
     
  return store;
}

export function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}