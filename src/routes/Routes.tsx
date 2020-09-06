import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from '../components/stateless/Dashboard';




export default function Routes() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
