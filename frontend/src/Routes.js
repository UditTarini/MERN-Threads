import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashBoard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashboard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <PrivateRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        />
        <PrivateRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
      </Switch>
    </Router>
  );
}
