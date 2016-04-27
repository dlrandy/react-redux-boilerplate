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

export default (store) => {
  
  return ( <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="articles" component={ Articles }>
    	<Route path="/article/:articleId" component={ Article } />
    </Route>
    <Route path="about" component={ About } />
    <Route path="*" component={ NoMatch } />
  </Route>
  )
};
