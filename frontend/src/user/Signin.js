import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import Base from "../core/Base";
import {signin, authenticate, isAuthenticated} from "../auth/helper";

export default function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };

  const loadingMsg = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMsg = () => {
    return (
      <div
        className="alert alert-danger"
        style={{display: error ? "" : "none"}}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleOnChange("email")}
            placeholder="Email"
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleOnChange("password")}
            placeholder="Password"
            value={password}
          />
        </div>
        <button
          onClick={onSubmit}
          className="btn orange btn-block"
          placeholder="Submit"
        >
          Submit
        </button>
      </form>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error, loading: true});
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("error in signin"));
  };

  const redirectOperation = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>redirect to admin</p>;
      } else {
        return <p>redirect to user dash board</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {loadingMsg()}
          {errorMsg()}
          {signInForm()}
          {redirectOperation()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
}
