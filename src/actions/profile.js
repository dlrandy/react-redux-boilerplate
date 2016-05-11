require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

import { FETCH_USERINFO,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILURE,
  FETCH_NEW_MESSAGE,
  FETCH_NEW_MESSAGE_SUCCESS,
  FETCH_NEW_MESSAGE_FAILURE,
 } from '../constants/profile';

export function fetchUserInfo() {
  const request = fetch('/api/Users/GetUserInfo', {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin'
    // body: JSON.stringify({
    //   UserName: userName,
    //   Password: password,
    // },
  });

  return {
  	type: FETCH_USERINFO,
  	payload: request,
  };
}

export function fetchUserInfoSuccess(res) {
  return {
    type: FETCH_USERINFO_SUCCESS,
    payload: res.json(), //res不加JSON（），结果就是Object {type: "PROFILE/FETCH_USERINFO_SUCCESS", payload: Response}
  };
}

export function fetchUserInfoFailure(res) {
  return {
    type: FETCH_USERINFO_FAILURE,
    payload: res.json(),
  };
}


export function fetchNewMessage() {
  
  const request = fetch('/api/message/newmessagecount', {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'same-origin'
  });
  return {
    type: FETCH_NEW_MESSAGE,
    payload: request,
  };
}

export function fetchNewMessageSuccess(res) {
  return {
    type: FETCH_NEW_MESSAGE_SUCCESS,
    payload: res.json(),
  };
}

export function fetchNewMessageFailure(res) {
  return {
    type: FETCH_NEW_MESSAGE_FAILURE,
    payload: res.json(),
  };
}