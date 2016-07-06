require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import { FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE } from '../constants/weibo';

export function fetchArticles(inxOfPage) {
	inxOfPage = inxOfPage || 1;
  const request = fetch('/api/Weibo/weibolist', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      page: inxOfPage,
    },
  )
  });

  return {
       types: [FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE],
       promise: () => request,
     };
}

export function fetchArticlesSuccess(res) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: res.json(),
  };
}

export function fetchArticlesFailure(res) {
  return {
    type: FETCH_ARTICLES_FAILURE,
    payload: res.json(),
  };
}

