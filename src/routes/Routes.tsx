import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../components/stateful/Home/Home';
import LazyLoadingComponent from '../shared/components/LazyLoadingComponent';

const WorkFlowComponent = React.lazy(() => import('../components/stateful/Workflow'));

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/flow/:id">
            <LazyLoadingComponent>
              <WorkFlowComponent />
            </LazyLoadingComponent>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
