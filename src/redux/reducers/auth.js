import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_RESET } from '../../constants/auth';

const initialState = {
  user: null, status:null, error:null, loading: false,
};

export default function (state = initialState, action= {}) {
  let error;
  switch( action.type ) {
    case LOGIN:
      return { ...state, user: null, status: 'signin', error: null, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.ResultData, status: 'authenticated', error: null, loading: false };
    case LOGIN_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors      
      return { ...state, user: null, status: 'signin', error: error, loading: false };
    case LOGIN_RESET:
      return { ...state, user: null, status:null, error:null, loading: false,};  
    default:
      return state;

  }
}
