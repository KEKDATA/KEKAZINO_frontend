import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from '@lib/browserHistory';

import StackPages from '@pages/StackPages';

import 'reset-css';

import './variables/styles.pcss';
import './styles.pcss';

if (process.env.DEV) {
  const createInspector = require('effector-logger').createInspector;
  createInspector();
}

ReactDOM.render(
  <Router history={history}>
    <StackPages />
  </Router>,
  document.getElementById('root'),
);
