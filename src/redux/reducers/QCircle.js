import {
  FETCH_CIRCLES, 
  FETCH_CIRCLES_SUCCESS,
  FETCH_CIRCLES_FAILURE } from '../../constants/QCircle';

const initialState = {
  qcircles: null, status:null, error:null, loading: false,
};

export default function (state = initialState, action= {}) {
  let error;
  switch( action.type ) {
    case FETCH_CIRCLES:
      return { ...state, qcircles: null, status: 'fetchingCircles', error: null, loading: true };
    case FETCH_CIRCLES_SUCCESS:
      return { ...state, qcircles: action.payload.ResultData, status: 'fetchedCircles', error: null, loading: false };
    case FETCH_CIRCLES_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors      
      return { ...state, qcircles: null, status: 'fetchedCircles', error: error, loading: false };  
    default:
      return state;

  }
}
