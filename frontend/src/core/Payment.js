import React, {useEffect} from "react";
import StripePayment from "./CartSummary";
import {loadCartItems, cartEmpty} from "./helper/cartHelper";
import {useState} from "react";
import {base_route} from "../backend";
import StripeCheckout from "react-stripe-checkout";
import {createOrder} from "./helper/orderHelper";

export default function Payment() {
  const [totCost, settotCost] = useState("");
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
    let Cost = JSON.parse(localStorage.getItem("cost"));
    console.log(Cost);
    settotCost(Cost);
  }, [reload]);

  const makePayment = (token, userId) => {
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
        // createOrder(userId,token,orderData);
        cartEmpty();

        const {status} = resp;
        console.log("STATUS", status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container col-5 mt-5">
      <h3 className="text-white Hind">Select a payment method</h3>
      <h4 className="text-white AlegreyaSans">Order Total: {totCost}</h4>
      <StripeCheckout
        stripeKey="pk_test_51GiDxIAimpSUIKJUQE4a9BXoszFV3j2VfNgLKuVJH8ZJ5wPgI4Aaa8IQh4hPZGb2RyvqLJNudTPzEGX8ypea617h00ElEDA1UJ"
        token={makePayment}
        amount={totCost * 100}
        name="Pay Securely"
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button type="button" className="btn orange btn-block">
          Pay with stripe
        </button>
      </StripeCheckout>
    </div>
  );
}
