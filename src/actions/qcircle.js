require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import { FETCH_CIRCLES, FETCH_CIRCLES_SUCCESS, FETCH_CIRCLES_FAILURE } from '../constants/QCircle';

export function fetchQCircleList() {

  const request = fetch('/api/circle/circlelist', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return {
  	type: FETCH_CIRCLES,
  	payload: request,
  };
}

export function fetchQCircleListSuccess(res) {
  return {
    type: FETCH_CIRCLES_SUCCESS,
    payload: res.json(),
  };
}

export function fetchQCircleListFailure(res) {
  return {
    type: FETCH_CIRCLES_FAILURE,
    payload: res.json(),
  };
}


