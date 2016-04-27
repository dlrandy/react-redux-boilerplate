import {LOAD, LOAD_SUCCESS} from '../../constants/auth';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS: 
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    default:
      return state;
  }
}

