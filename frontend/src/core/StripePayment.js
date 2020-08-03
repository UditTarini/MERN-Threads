import React, {useState} from "react";
import {useEffect} from "react";
import {isAuthenticated} from "../auth/helper";
import {cartEmpty, loadCartItems} from "./helper/cartHelper";
import {Link} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {base_route} from "../backend";
import {createOrder} from "./helper/orderHelper";

const StripePayment = ({
  products,
  reload = undefined,
  setReload = (param) => param,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const [totCost, settotCost] = useState("");

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const totalItemCost = () => {
    return products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
  };

  const taxCost = () => {
    return products.reduce((accumulator, currentValue) => {
      if (currentValue.price < 1000) {
        let total = accumulator + currentValue.price * 0.05;
        return Math.round(total * 100) / 100;
      } else {
        let total = accumulator + Math.round(currentValue.price * 0.15);
        return Math.round(total * 100) / 100;
      }
    }, 0);
  };
  useEffect(() => {
    setTotCost();
  });
  const setTotCost = () => {
    settotCost(totalItemCost() + taxCost() + 25 + 40);
  };

  const makePayment = (token) => {
    const body = {
      token,
      totCost,
    };
    const headers = {
      "Content-type": "application/json",
    };
    return fetch(`${base_route}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((resp) => {
        console.log(resp);
        createOrder();
        cartEmpty();
        const {status} = resp;
        console.log("STATUS", status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mb-3 ">
        <div className="pt-4 mx-2">
          <h5 className="mb-3">Cart Summary</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Items Total
              <span>{`\u20B9 ${totalItemCost()}`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Postage & Packing
              <span>{`\u20B9 25`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Tax
              <span>{`\u20B9 ${taxCost()}`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between  text-dark align-items-center">
              Shipping
              <span>{`\u20B9 40`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between  text-dark align-items-center border-0 mb-3">
              <div>
                <strong>The total amount </strong>
              </div>
              <span>
                <strong>{`\u20B9 ${totCost}`}</strong>
              </span>
            </li>
          </ul>
          <StripeCheckout
            stripeKey="pk_test_51GiDxIAimpSUIKJUQE4a9BXoszFV3j2VfNgLKuVJH8ZJ5wPgI4Aaa8IQh4hPZGb2RyvqLJNudTPzEGX8ypea617h00ElEDA1UJ"
            token={makePayment}
            amount={totCost * 100}
            name="Pay Securely"
            shippingAddress
            billingAddress
          >
            <button type="button" className="btn orange btn-block">
              Checkout
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
