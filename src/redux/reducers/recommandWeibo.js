import {
  FETCH_RECOMMANDWEIBO, 
  FETCH_RECOMMANDWEIBO_SUCCESS,
  FETCH_RECOMMANDWEIBO_FAILURE } from '../../constants/recommandWeibo';
//
const initialState = {
  item: null, status:null, error:null, loading: false,
};

export default function (state = initialState, action= {}) {
  let error;
  switch( action.type ) {
    case FETCH_RECOMMANDWEIBO:
      return { ...state, item: null,
       status: 'fetchingRecommandWeibo',
        error: null, loading: true };
    case FETCH_RECOMMANDWEIBO_SUCCESS:
//     CutPage:{Page: 1, PageSize: 4, Total: 76653}
// ExistsNickname
// List
      return { ...state,
       item: action.payload, status: 'fetchedrecommandWeibo', error: null, loading: false };
    case FETCH_RECOMMANDWEIBO_FAILURE:
      error = action.payload.statusText || {message: action.payload.Message};//2nd one is network or server down errors      
      return { ...state, item: null,
       status: "fetchingRecommandWeiboFailure",
        error: error, loading: false };  
    default:
      return state;

  }
}
