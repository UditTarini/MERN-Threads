import React, {useState} from "react";
import Base from "../core/Base";
import {signup} from "../auth/helper";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const {name, email, password, error, success} = values;
  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({name, email, password})
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error, success: false});
        } else {
          setValues({
            ...values,
            // to clear all field after submit
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const successMsg = () => {
    return (
      <div
        className="alert alert-success"
        style={{display: success ? "" : "none", fontFamily: "Hind"}}
      >
        <h4 class="alert-heading">Wow...!</h4>
        Your account created succesfully. You can{" "}
        <a href="/signin" class="alert-link">
          Signin here
        </a>
      </div>
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

  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleOnChange("name")}
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleOnChange("email")}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleOnChange("password")}
            value={password}
            placeholder="Password"
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
  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {successMsg()}
          {errorMsg()}
          {signUpForm()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
}
