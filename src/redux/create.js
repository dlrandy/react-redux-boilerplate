import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';//这里我们并没用thunk中间件
import DevTools from '../containers/DevTools';
import promise from 'redux-promise';

const logger = createLogger();
const finalCreateStore = compose(
	applyMiddleware(thunk),
	applyMiddleware(logger),
	applyMiddleware(promise),
	DevTools.instrument())(createStore);
export default function configure(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
     if (module.hot) {
	    module.hot.accept('./reducers', () => {
        store.replaceReducer('./reducers');
	    });
     }
  return store;
}
