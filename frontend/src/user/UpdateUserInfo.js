import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Base from "../core/Base";
import {isAuthenticated, addUpdatedUser} from "../auth/helper";
import {useEffect} from "react";
import {updateUser} from "./helper/userApiCalls";

const UpdateUserInfo = () => {
  const [values, setValues] = useState({
    error: "",
    loading: false,
    success: false,
  });

  const [userInfo, setuserInfo] = useState({
    email: "",
    name: "",
  });

  const {error, success} = values;
  const {email, name} = userInfo;
  const {user, auth_token} = isAuthenticated();

  useEffect(() => {
    setuserInfo({...userInfo, email: user.email, name: user.name});
  }, []);

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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true, success: false});

    updateUser(user._id, auth_token, userInfo)
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          addUpdatedUser(data, () => {
            setValues({
              ...values,
              success: true,
              loading: false,
              name: "",
              email: "",
            });
          });
        }
      })
      .catch(console.log("error in update"));
  };

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
    setuserInfo({...userInfo, [field]: event.target.value});
  };

  const updateForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleOnChange("name")}
            placeholder="name"
            value={name}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleOnChange("email")}
            placeholder="email"
            value={email}
          />
        </div>

        <button
          onClick={onSubmit}
          className="btn orange mt-4 text-white"
          placeholder="Submit"
        >
          Submit
        </button>
      </form>
    );
  };

  const successMsg = () => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 ">
          {successMsg()}
          {errorMsg()}
          <div className="bg-dark p-4">
            <h3 className="py-3"> Update User </h3>

            {updateForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateUserInfo;
