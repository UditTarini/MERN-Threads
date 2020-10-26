import React, {useEffect} from "react";

import {loadCartItems, cartEmpty} from "./helper/cartHelper";
import {useState} from "react";
import {base_route} from "../backend";
import StripeCheckout from "react-stripe-checkout";
import {createOrder} from "./helper/orderHelper";
import {isAuthenticated} from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import {getMeToken, braintreePayment} from "./helper/paymentHelper";
import {Redirect} from "react-router-dom";
import {stripePayment} from "./helper/paymentHelper";

export default function Payment() {
  const [totCost, settotCost] = useState("");
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().auth_token;

  useEffect(() => {
    setProducts(loadCartItems());
    let Cost = JSON.parse(localStorage.getItem("cost"));

    settotCost(Cost);
    getToken(userId, token);
  }, [reload]);

  // for braintree
  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({...info, error: info.error});
      } else {
        const clientToken = info.clientToken;
        setInfo({clientToken});
      }
    });
  };

  const braintreeDropIn = () => {
    return info.clientToken !== null ? (
      <div>
        <DropIn
          options={{authorization: info.clientToken}}
          onInstance={(instance) => (info.instance = instance)}
        />
        <button
          type="button"
          onClick={onPurchase}
          className="btn btn-light text-dark mb-2 btn-block"
        >
          Pay
        </button>
      </div>
    ) : (
      <h1>loading</h1>
    );
  };

  // for braintree
  const onPurchase = () => {
    setInfo({loading: true});
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;

      const paymentData = {
        paymentMethodNonce: nonce,
        amount: totCost,
      };
      braintreePayment(userId, token, paymentData)
        .then((resp) => {
          setInfo({...info, success: resp.success, loading: false});

          const orderData = {
            products: products,
            transaction_id: resp.transaction.id,
            amount: resp.transaction.amount,
          };
          createOrder(userId, token, orderData);

          cartEmpty();
        })
        .catch((err) => {
          setInfo({loading: false, success: false});
        });
    });
  };

  // for stripe
  const makePayment = (token) => {
    const body = {
      token,
      totCost,
    };
    stripePayment(body)
      .then((resp) => {
        setInfo({...info, success: resp.paid, loading: false});

        const orderData = {
          products: products,
          transaction_id: resp.id,
          amount: resp.amount,
        };

        createOrder(userId, isAuthenticated().auth_token, orderData);
        cartEmpty();
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="container col-5 mt-5">
      <h3 className="text-white Hind">Select a payment method</h3>
      <h4 className="text-white AlegreyaSans">Order Total: {totCost}</h4>
      <div id="dropin-container"></div>
      {braintreeDropIn()}

      <StripeCheckout
        stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
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
      {info.success && <Redirect to="/" />}
    </div>
  );
}
