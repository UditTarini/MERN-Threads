import React, {useState} from "react";
import {useEffect} from "react";
import {isAuthenticated} from "../auth/helper";
import {cartEmpty, loadCartItems} from "./helper/cartHelper";
import {Link} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {base_route} from "../backend";
import {createOrder} from "./helper/orderHelper";

const CartSummary = ({
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
    let cost = totalItemCost() + taxCost() + 25 + 40;
    settotCost(cost);
    localStorage.setItem("cost", cost);
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

          <Link className="btn orange btn-block" to="/payment">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
