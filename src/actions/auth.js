require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_RESET } from '../constants/auth';

export function login(user) {
  const { userName, password } = user;
  const request = fetch('/api/Users/Login', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',//不加，token不会覆盖
    body: JSON.stringify({
      UserName: userName,
      Password: password,
    },
  )
  });

  return {
  	type: LOGIN,
  	payload: request,
  };
}

export function loginSuccess(res) {
  return {
    type: LOGIN_SUCCESS,
    payload: res,
  };
}

export function loginFailure(res) {
  return {
    type: LOGIN_FAILURE,
    payload: res,
  };
}

export  function loginReset(res) {
	return {
		type: LOGIN_RESET
	};
}

