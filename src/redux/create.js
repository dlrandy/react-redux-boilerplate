import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';//这里我们并没用thunk中间件
import DevTools from '../containers/DevTools';
import promise from 'redux-promise';
import {persistStore, autoRehydrate} from 'redux-persist'

const logger = createLogger();
const finalCreateStore = compose(
	applyMiddleware(thunk),
	applyMiddleware(logger),
	applyMiddleware(promise),
	autoRehydrate(),
	DevTools.instrument())(createStore);
export default function configure(initialState) {
  const store = finalCreateStore(rootReducer);
    persistStore(store, {whitelist: ['auth']}, () => {
    	console.log('peresist');
    });
     if (module.hot) {
	    module.hot.accept('./reducers', () => {
        store.replaceReducer('./reducers');
	    });
     }
     
  return store;
}
