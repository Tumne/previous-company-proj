import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'styled-components/cssprop'; // eslint-disable-line @typescript-eslint/no-unused-vars

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { bootSequence as intlBootSequence } from 'utils/intlUtils';
import { authStorage, cacheAuth } from 'utils/authUtils';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

// Let's go
intlBootSequence().then(renderApp);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (!process.env.REACT_APP_GRAPH_BASE) {
  throw Error('Provide REACT_APP_GRAPH_BASE');
}

if (!authStorage.get()) {
  fetch(process.env.REACT_APP_GRAPH_BASE + '/graphql', {
    method: 'POST',
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'password',
      query: `{
              user {
                token: authenticationToken
              }
            }`,
    }),
  })
    .then(response => response.json())
    .then(response => {
      cacheAuth(response.data.user.token);
    });
}
