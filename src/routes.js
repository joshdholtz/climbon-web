import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';
import Index from './components/index'
import Login from './components/login'
import Home from './components/home'

import auth from './auth'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

function requireNonAuth(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/home'
    })
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="login" component={Login}  onEnter={requireNonAuth} />
    <Route path="home" component={Home} onEnter={requireAuth} />
  </Route>
)
