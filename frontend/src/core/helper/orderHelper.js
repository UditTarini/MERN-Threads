const {base_route} = require("../../backend");

export const createOrder = (userId, token, orderData) => {
  console.log("order");
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
      return resp.json();
    })
    .catch((err) => console.log(err));
};
