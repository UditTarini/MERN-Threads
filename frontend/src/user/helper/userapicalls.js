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

export const loadPurchsedItems = () => {
  if (typeof window !== undefined) {
    var existing = JSON.parse(localStorage.getItem("jwt"));
    var purchases = existing.user.purchases;
    return purchases;
    // if (purchases) {

    //   purchases.map((data)=>
    //   console.log(existing.user.purchases);
    //   return existing.user.purchases.products;
    //   )

    // } else {
    //   return [];
    // }
  }
};
