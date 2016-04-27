import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import articles from './articles';
export default combineReducers({
  routing: routerReducer,
  auth,
  articles,
})
