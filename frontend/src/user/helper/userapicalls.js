import {base_route} from "../../backend";

export const updateUser = (userId, token, user) => {
  return fetch(`${base_route}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(user),
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const loadOrder = (userId, token) => {
  return fetch(`${base_route}/user/orders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .catch((err) => console.log(err));
};
