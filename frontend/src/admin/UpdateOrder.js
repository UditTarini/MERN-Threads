import React, {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import Base from "../core/Base";
import {getAOrder, updateOrder, getOrderStatus} from "./helper/adminApiCalls";
import {useEffect} from "react";

export default function UpdateOrder({match}) {
  const [values, setValues] = useState({
    status: "",

    products: [],
    transactionID: "",
    amount: "",
    customerID: "",
    allStatus: ["Received", "Cancelled", "Processing", "Shipped", "Delivered"],
    error: "",
    update: false,
  });

  const {
    status,
    allStatus,
    products,
    transactionID,
    amount,
    customerID,
    error,
    update,
  } = values;
  const {user, auth_token} = isAuthenticated();

  const preload = (token, orderId, userId) => {
    getAOrder(token, orderId, userId).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        // loadStatus(userId, token);
        setValues({
          ...values,
          status: data.status,
          products: data.products,
          transactionID: data.transaction_id,
          amount: data.amount,
          customerID: data.user,
        });
      }
    });
  };

  useEffect(() => {
    preload(auth_token, match.params.orderId, user._id);
  }, []);

  const successMsg = () => {
    if (update) {
      return (
        <h4 className="alert alert-success text-success">
          Status updated successfully
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
    updateOrder(auth_token, status, match.params.orderId, user._id).then(
      (data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({update: true});
          window.location.reload();
        }
      }
    );
  };

  const handleOnChange = (field) => (event) => {
    setValues({});

    setValues({...values, [field]: event.target.value});
  };
  const orderFormComponent = (name, value) => {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <p className="lead"> {name}:</p>
          </div>
          <div className="col-6">
            <p className="lead"> {value}</p>
          </div>
        </div>
      </div>
    );
  };
  const orderForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="form-group">
            <select
              onChange={handleOnChange("status")}
              className="form-control"
            >
              <option>Select</option>
              {allStatus &&
                allStatus.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
          </div>
          {orderFormComponent("Status", status)}
          {/* {orderFormComponent("Status", allStatus)} */}

          {orderFormComponent("Transaction_ID", transactionID)}
          {orderFormComponent("Amount", amount)}
          {orderFormComponent("Customer_ID", customerID)}
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
            <h3 className="py-3"> Update Order </h3>

            {orderForm()}
          </div>
        </div>
      </div>
    </Base>
  );
}
