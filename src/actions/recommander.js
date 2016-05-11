require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import { FETCH_RECOMMANDERS, FETCH_RECOMMANDERS_SUCCESS,
 FETCH_RECOMMANDERS_FAILURE } from '../constants/recommander';

export function fetchRecommanders(authed) {
let url = authed ? '/api/Users/GetRecommendUserList' : '/api/guest/GetRecommendUserList';
 const request = fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({
      page: 1,
      iscircle: 0,
    }),
  });

  return {
  	type: FETCH_RECOMMANDERS,
  	payload: request,
  };
}

export function fetchRecommandersSuccess(res) {
  return {
    type: FETCH_RECOMMANDERS_SUCCESS,
    payload: res.json(),
  };
}

export function fetchRecommandersFailure(res) {
  return {
    type: FETCH_RECOMMANDERS_FAILURE,
    payload: res.json(),
  };
}


