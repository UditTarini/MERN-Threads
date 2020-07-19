import React, {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {Redirect} from "react-router-dom";
import Base from "../core/Base";
import {
  getCategories,
  getAProduct,
  updateProduct,
} from "./helper/adminApiCalls";
import {useEffect} from "react";

export default function UpdateProduct({match}) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    loading: false,
    error: "",
    categories: [],
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    loading,
    error,
    categories,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const {user, auth_token} = isAuthenticated();

  const preload = (productId) => {
    getAProduct(productId).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        loadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const successMsg = () => {
    if (createdProduct) {
      return (
        <h4 className="alert alert-success text-success">
          {createdProduct} updated successfully
        </h4>
      );
    }
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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true, getRedirect: true});
    updateProduct(user._id, auth_token, match.params.productId, formData).then(
      (data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleOnChange = (field) => (event) => {
    setValues({});
    const value =
      field === "photo" ? event.target.files[0] : event.target.value;

    formData.set(field, value);
    setValues({...values, error: false, createdProduct: false, [field]: value});
  };

  const productForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleOnChange("name")}
            value={name}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            onChange={handleOnChange("description")}
            value={description}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={handleOnChange("photo")}
            name="photo"
            accept="image"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            onChange={handleOnChange("price")}
            value={price}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleOnChange("category")}
            placeholder="Category"
            className="form-control"
          >
            <option>Select</option>
            {categories &&
              categories.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            onChange={handleOnChange("stock")}
            value={stock}
            placeholder="Stock"
            required
          />
        </div>
        <button onClick={onSubmit} className="btn orange mt-4 text-white">
          Update
        </button>
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
            <h3 className="py-3"> Update Product </h3>

            {productForm()}
          </div>
        </div>
      </div>
    </Base>
  );
}
