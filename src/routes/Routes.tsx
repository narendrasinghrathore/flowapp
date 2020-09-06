import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from '../components/stateless/Dashboard';
import Login from '../components/stateless/Login/Login';
import { AppState } from '../models/Workflow';
import { getAppLoggedIn } from '../store/selectors/flow.selector';
import { useSelector } from 'react-redux';




export default function Routes() {

  const loggedIn = useSelector((state: AppState) => getAppLoggedIn(state));

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" render={({ location }) => {

            return loggedIn ? <Dashboard /> : <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />

          }}>

          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

