import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

import './index.css';

import './styles/navbar-custom.css';
import './styles/common.css';
import './styles/home.css';

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
);
