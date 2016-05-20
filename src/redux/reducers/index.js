import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'
import auth from './auth';
import articles from './articles';
import QCircles from './QCircle';
import recommander from './recommander';
import recommandWeibo from './recommandWeibo';
import profile from './profile';
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  articles,
  QCircles,
  recommander,
  recommandWeibo,
  profile,

})

//reducer的名字对应着state的key，reducer返回的action对应着reducer下的key。

