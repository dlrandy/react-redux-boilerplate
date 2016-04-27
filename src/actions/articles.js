// https://github.com/cloudmu/react-redux-starter-kit/blob/master/src/actions/auth.js
// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.q1lr5wojy
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from '../constants/articles';
// const ROOT_URL = location.href.indexOf('localhost') > 0 ? ' http://192.9.169.135:801/api' : ' http://192.9.169.135:801/api';
export function fetchPosts() {
  const request = fetch('/api/guest/ShuoshuoList', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userid: 0,
      ptype: 1,
      top: 5,
      page: 1,
    },
  )
  });

  return request;
}

export function fetchPostsSuccess(res) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: res.json(),
  };
}

export function fetchPostsFailure(res) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: res.json(),
  };
}
