import {FETCH_POSTS, FETCH_POSTS_SUCCESS,FETCH_POSTS_FAILURE} from '../../constants/articles';

const INITIAL_STATE = {
	postsList:{posts:null, error:null, loading: false},
	newPost: {post: null, error: null, loading: false},
	deletePost: {post: null, error:null, loading: false},
	activePost:{post: null, error: null, loading: false}
};

export default function articles(state = INITIAL_STATE, action={}) {
	let error;
	console.log(action);
	switch(action.type){
	
	  case FETCH_POSTS:
	  	return {
	  	  ...state,
	  	  postsList: {
	  	  	posts: null, 
	  	  	error: null, 
	  	  	loading: true
	  	  }
	  	};
	  case FETCH_POSTS_SUCCESS:
	  	return {
	      ...state,
	      postsList: {
	      	posts: action.payload,//Code: "200", status: true, Message: "OK", nowtime: "1462493842", ResultData: Object
	      	error: null, 
	      	loading: false
	      }
	  	};
	  case FETCH_POSTS_FAILURE:
	  	error = action.payload.error || action.payload.message;
	  	return {
	  	  ...state,
	  	  postsList: {
	  	  	posts: null, 
	  	  	error: error,
	  	  	loading: false
	  	  }
	  	};
	  default:
	  	return state;
	}
}





















