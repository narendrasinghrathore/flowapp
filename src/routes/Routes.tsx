import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
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

{/* <Route path="/login">
<LoginPage />
</Route>
<PrivateRoute path="/">
<PublicPage />
</PrivateRoute>

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: Function) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb: Function) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
  function AuthButton() {
    let history = useHistory();
  
    return fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      );
  }
  
  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute(props: { children: React.ReactElement, path: string }) {
    const { children, ...rest } = props;
    return (
      <Route
        {...rest}
        render={({ location }: any) =>
          fakeAuth.isAuthenticated ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
        }
      />
    );
  }
  
  function PublicPage() {
    return <h3>Public</h3>;
  }
  
  function ProtectedPage() {
    return <h3>Protected <AuthButton /></h3>;
  }
  
  function LoginPage() {
    let history = useHistory();
    let location = useLocation();
  
    let { from }: any = location.state || { from: { pathname: "/" } };
    let login = () => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
    };
  
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={login}>Log in</button>
      </div>
    );
  } */}
