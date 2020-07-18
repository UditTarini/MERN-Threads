import React from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";

export default function AdminDashboard() {
  const {
    user: {name, email, role},
  } = isAuthenticated();

  const adminLeftView = () => {
    return (
      <div className="card">
        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <h4 className=" text-center text-white">Navigation</h4>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/orders"
              className="nav-link orange-text font-weight-bold"
            >
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/category"
              className="nav-link orange-text font-weight-bold"
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/products"
              className="nav-link orange-text font-weight-bold"
            >
              Create Products
            </Link>
          </li>

          <li className="list-group-item">
            <Link
              to="/admin/products"
              className="nav-link orange-text font-weight-bold"
            >
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightView = () => {
    return (
      <div className="card">
        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <h4 className=" text-center text-white">Admin Information</h4>
          </li>
          <li className="list-group-item ">
            <span className="badge orange text-white mr-2">Name</span>
            {name}
          </li>
          <li className="list-group-item ">
            <span className="badge orange text-white mr-2">Email</span>
            {email}
          </li>
          <li className="list-group-item ">
            <span className="badge badge-danger float-right">
              Admin privileges
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base className="container  p-4">
      <p
        className="text-white mb-5 "
        style={{fontFamily: "Alegreya Sans", fontSize: 40}}
      >
        Welcome Admin...
      </p>
      <div className="row">
        <div className="col-3">{adminLeftView()}</div>
        <div className="col-9">{adminRightView()}</div>
      </div>
    </Base>
  );
}
