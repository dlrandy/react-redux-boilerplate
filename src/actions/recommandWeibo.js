require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import { FETCH_RECOMMANDWEIBO, FETCH_RECOMMANDWEIBO_SUCCESS,
 FETCH_RECOMMANDWEIBO_FAILURE } from '../constants/recommandWeibo';

export function fetchRecommandWeibo() {
let url = '/api/weibo/GetGuestRecommendWeiboList';
 const request = fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
     body: JSON.stringify({
      param1:undefined,
      param2:undefined,
      param3:1,
      param4:6,
    }),
  });

  return {
  	type: FETCH_RECOMMANDWEIBO,
  	payload: request,
  };
}

export function fetchRecommandWeiboSuccess(res) {
  return {
    type: FETCH_RECOMMANDWEIBO_SUCCESS,
    payload: res.json(),
  };
}

export function fetchRecommandWeiboFailure(res) {
  return {
    type: FETCH_RECOMMANDWEIBO_FAILURE,
    payload: res.json(),
  };
}


