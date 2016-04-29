import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'
import auth from './auth';
import articles from './articles';
export default combineReducers({
  routing: routerReducer,
  auth,
  articles,
  reduxAsyncConnect,
})
