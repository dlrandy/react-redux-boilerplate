import {
  FETCH_RECOMMANDERS, 
  FETCH_RECOMMANDERS_SUCCESS,
  FETCH_RECOMMANDERS_FAILURE } from '../../constants/recommander';
//
const initialState = {
  recommanders: []/* null RecommandUser.js:25Uncaught TypeError: Cannot read property 'map' of undefined*/, status:null, error:null, loading: false,
};

export default function (state = initialState, action= {}) {
  let error;
  switch( action.type ) {
    case FETCH_RECOMMANDERS:
      return { ...state, recommanders: [],
       status: 'fetchingRecommanders',
        error: null, loading: true };
    case FETCH_RECOMMANDERS_SUCCESS:
//     CutPage:{Page: 1, PageSize: 4, Total: 76653}
// ExistsNickname
// List
      return { ...state,
       recommanders: action.payload, status: 'fetchedRecommanders', error: null, loading: false };
    case FETCH_RECOMMANDERS_FAILURE:
      error = action.payload.statusText || {message: action.payload.Message};//2nd one is network or server down errors      
      return { ...state, recommanders: [],
       status: "fetchingRecommandersFailure",
        error: error, loading: false };  
    default:
      return state;

  }
}
