import {base_route} from "../../backend";

export const signup = (user) => {
  return fetch(
    // url
    `${base_route}/signup`,
    {
      // data for url
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(
    // url
    `${base_route}/signin`,
    {
      // data for url
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// for sign in
export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const addUpdatedUser = (data, next) => {
  if (typeof window != "undefined") {
    var existing = JSON.parse(localStorage.getItem("jwt"));
    existing.user = data;

    localStorage.setItem("jwt", JSON.stringify(existing));
    next();
  }
};

export const signout = (next) => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${base_route}/signout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("signout success");
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
