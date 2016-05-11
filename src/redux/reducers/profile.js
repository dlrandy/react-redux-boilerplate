import { FETCH_USERINFO,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILURE,
  FETCH_NEW_MESSAGE,
  FETCH_NEW_MESSAGE_SUCCESS,
  FETCH_NEW_MESSAGE_FAILURE,
 } from '../../constants/profile';
//
const initialState = {
  userInfo: [] /* null RecommandUser.js:25Uncaught TypeError: Cannot read property 'map' of undefined*/, status:null, error:null, loading: false,
  newMessages: []
};

export default function (state = initialState, action= {}) {
  let error;
  switch( action.type ) {
    case FETCH_USERINFO:
      return {
      	...state, loading:true, error: null, status: 'fetchingUserInfo', userInfo: [] 
      };
    case FETCH_USERINFO_SUCCESS:
      return {
      	...state, loading:false, error: null, status: '', userInfo: action.payload 
      };
    case FETCH_USERINFO_FAILURE:
     error = action.payload.statusText || {message: action.payload.Message};//2nd one is network or server down errors      
      return {
      	...state, loading:false, error: null, status: '', userInfo: [] 
      };
    case FETCH_NEW_MESSAGE:
      return {
      	...state, loading:true, error: null, status: '', newMessages: [] 
      };
    case FETCH_NEW_MESSAGE_SUCCESS:
      return {
      	...state, loading:false, error: null, status: '', newMessages: action.payload 
      };
    case FETCH_NEW_MESSAGE_FAILURE:
      error = action.payload.statusText || {message: action.payload.Message};//2nd one is network or server down errors      
      return {
      	...state, loading:false, error: null, status: '', newMessages: [] 
      }; 
    default:
      return state;

  }
}
