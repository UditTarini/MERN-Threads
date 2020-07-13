import React from "react";
import {Link, withRouter} from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {color: "#ff7a29"};
  } else {
    return {color: "#d1d1d1"};
  }
};

const NavigationBar = ({history}) => {
  return (
    <nav class="navbar navbar-expand-lg  baseColor">
      <a
        class="navbar-brand orange-text "
        style={{fontFamily: "Satisfy", fontSize: 40}}
        href="#"
      >
        Threads
      </a>
      <button
        class="navbar-toggler navbar-dark"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon "></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul
          style={{fontFamily: "Alegreya Sans", fontSize: 19}}
          className=" navbar-nav"
        >
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/"
            >
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/"
            >
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavigationBar);
