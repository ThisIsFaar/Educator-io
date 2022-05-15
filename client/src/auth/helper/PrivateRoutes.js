import React from "react";
import { Route, useNavigate,  Outlet  } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Outlet />
        ) : (
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: props.location },
          //   }}
          // />
          navigate("/login")
        )
      }
    />
  );
};

export default PrivateRoute;
