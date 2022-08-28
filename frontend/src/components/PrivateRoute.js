import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../context";

const PrivateRoute = ({ path, component: Component }) => {
  const {
    state: { user, loading },
  } = useGlobalContext();
  return (
    <Route path={path} exact>
      {!(user || loading) ? <Redirect to={"/login"} /> : <Component />}
    </Route>
  );
};

export default PrivateRoute;
