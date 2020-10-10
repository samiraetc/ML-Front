import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from '../App';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route
          exact
          path="/"
          component={require('../pages/Home/Home').default}
        />
        <Route
          exact
          path="/items"
          component={require('../pages/Products/Products').default}
        />
        <Route
          exact
          path="/items/:id"
          component={require('../pages/Product/Product').default}
        />
        <Route component={require('../pages/Error').default} />
      </Switch>
    </App>
  );
}
