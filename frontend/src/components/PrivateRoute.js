import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../context";

const PrivateRoute = (props) => {
  const { path, component: Component, exact } = props;
  const {
    state: { user, loading },
  } = useGlobalContext();
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !(user || loading) ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
