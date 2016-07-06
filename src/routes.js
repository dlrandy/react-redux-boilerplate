import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    About,
    Article,
    Articles,
    Home,
    NoMatch,
  } from './containers';
import { loadAuth } from './actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
   function checkAuth() {
     const { auth: {user}} = store.getState();
     if (!user) {
      replace('/');
     }
     cb();
   }
   if (!isAuthLoaded(store.getState())) {
     store.dispatch(loadAuth()).then(checkAuth);
   } else {
     checkAuth();
   }
  }
  return ( <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="articles" component={ Articles }/>
    <Route path="article/:articleId" component={ Article } />
    <Route path="about" component={ About } />
    <Route path="*" component={ NoMatch } />
  </Route>
  )
};
