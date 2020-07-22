import {base_route} from "../../backend";

export const getProducts = (params) => {
  return fetch(`${base_route}/products`, {method: "GET"})
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};
