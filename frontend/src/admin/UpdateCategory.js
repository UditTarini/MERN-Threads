import React, {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {Redirect} from "react-router-dom";
import Base from "../core/Base";
import {getACategory, updateCategory} from "./helper/adminApiCalls";
import {useEffect} from "react";

export default function UpdateCategory({match}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {user, auth_token} = isAuthenticated();

  const preload = (categoryId) => {
    getACategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const successMsg = () => {
    if (success) {
      return (
        <h4 className="alert alert-success text-success">
          Category updated successfully
        </h4>
      );
    }
  };

  const errorMsg = () => {
    if (error)
      return <h4 className="alert alert-danger text-danger">{error}</h4>;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    setSuccess(false);
    updateCategory(user._id, auth_token, match.params.categoryId, {name}).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const handleOnChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const productForm = () => {
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
            Update
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
            <h3 className="py-3"> Update Category </h3>

            {productForm()}
          </div>
        </div>
      </div>
    </Base>
  );
}
