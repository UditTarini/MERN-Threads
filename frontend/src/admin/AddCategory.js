import React, {useState} from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import createCategory from "./helper/adminApiCalls";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {user, auth_token} = isAuthenticated();

  const handleOnChange = (event) => {
    setName(event.target.value);
    setError("");
  };

  const successMsg = () => {
    if (success)
      return (
        <h4 className="alert alert-success text-success">
          Category created successfully
        </h4>
      );
  };

  const errorMsg = () => {
    if (error)
      return (
        <h4 className="alert alert-danger text-danger">
          Failed to create category
        </h4>
      );
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    setSuccess(false);
    createCategory(user._id, auth_token, {name}).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleOnChange}
            value={name}
            placeholder="Enter a category"
            autoFocus
            required
          />
          <button onClick={onSubmit} className="btn orange mt-4 text-white">
            Create
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 ">
          {successMsg()}
          {errorMsg()}
          <div className="bg-dark p-4">
            <h3 className="py-3"> Create Product </h3>

            {myCategoryForm()}
          </div>
        </div>
      </div>
    </Base>
  );
}
