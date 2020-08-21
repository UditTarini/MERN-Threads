import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashBoard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import UserDashboard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

import Orders from "./admin/Orders";
import UpdateProduct from "./admin/UpdateProduct";
import ManageProduct from "./admin/ManageProducts";
import ManageCategory from "./admin/ManageCategory";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateOrder from "./admin/UpdateOrder";
import Cart from "./core/Cart";
import Payment from "./core/Payment";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <PrivateRoute path="/payment" exact component={Payment} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/create/products"
          exact
          component={AddProduct}
        />
        <AdminRoute path="/admin/products" exact component={ManageProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/categories" exact component={ManageCategory} />

        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />

        <AdminRoute
          path="/admin/order/update/:orderId"
          exact
          component={UpdateOrder}
        />
      </Switch>
    </Router>
  );
}
