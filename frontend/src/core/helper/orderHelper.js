const {base_route} = require("../../backend");

export const createOrder = (userId, token, orderData) => {
  return fetch(`${base_route}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({order: orderData}),
  })
    .then((resp) => {
      console.log("order", resp.json());
      return resp.json();
    })
    .catch((err) => console.log(err));
};
