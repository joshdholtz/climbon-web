import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';
import Index from './components/index'
import Login from './components/login'
import Home from './components/home'
import Locations from './components/locations'
import Reviews from './components/reviews'

import RouteIndex from './components/routes/route_index'
import RouteShow from './components/routes/route_show'
import RouteCreate from './components/routes/route_create'

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
    
    <Route path="locations" component={Locations} />
    <Route path="reviews" component={Reviews} />
    
    <Route path="routes" component={RouteIndex} />
    <Route path="routes/create" component={RouteCreate} />
    <Route path="routes/:id" component={RouteShow} />
  </Route>
)
