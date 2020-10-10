import React from 'react';
import ReactDOM, { hashHistory } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

import './index.scss';

ReactDOM.render(
  <Router>
    <Routes history={hashHistory} />
  </Router>,
  document.getElementById('root'),
);
