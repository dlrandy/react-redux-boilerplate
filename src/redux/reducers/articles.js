import {FETCH_POSTS, FETCH_POSTS_SUCCESS,FETCH_POSTS_FAILURE} from '../../constants/articles';

const INITIAL_STATE = {
	postsList:{posts:[], error:null, loading: false},
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
	  	  	posts: [], 
	  	  	error: null, 
	  	  	loading: true
	  	  }
	  	};
	  case FETCH_POSTS_SUCCESS:
	  	return {
	      ...state,
	      postsList: {
	      	posts: action.payload,
	      	error: null, 
	      	loading: false
	      }
	  	};
	  case FETCH_POSTS_FAILURE:
	  	error = action.payload.data || action.payload.message;
	  	return {
	  	  ...state,
	  	  postsList: {
	  	  	posts: [], 
	  	  	error: error,
	  	  	loading: false
	  	  }
	  	};
	  default:
	  	return state;
	}
}





















