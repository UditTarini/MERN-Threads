const {base_route} = require("../../backend");

export const getMeToken = (userId, token) => {
  return fetch(`${base_route}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const braintreePayment = (userId, token, paymentInfo) => {
  return fetch(`${base_route}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((resp) => {
      //   console.log(resp);
      return resp.json();
    })
    .catch((err) => console.log(err));
};
