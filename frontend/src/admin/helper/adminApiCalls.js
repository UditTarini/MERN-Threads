const {base_route} = require("../../backend");

// for category
export const createCategory = (userId, token, category) => {
  return fetch(`${base_route}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${base_route}/categories`, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((error) => console.log(error));
};

export const getACategory = (categoryId) => {
  return fetch(`${base_route}/category/${categoryId}`, {
    method: "GET",
  })
    .then((resp) => {
      // console.log(resp.json());
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (userId, token, categoryId) => {
  return fetch(`${base_route}/category/${categoryId}/${userId}`, {
    method: "DELETE",
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

export const updateCategory = (userId, token, categoryId, category) => {
  return fetch(`${base_route}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(category),
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

// for product

export const createProduct = (userId, token, product) => {
  return fetch(`${base_route}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // b cuz of formData
    body: product,
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((error) => console.log(error));
};

export const getProducts = () => {
  return fetch(`${base_route}/products`, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const getAProduct = (productId) => {
  return fetch(`${base_route}/product/${productId}`, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (userId, token, productId, product) => {
  return fetch(`${base_route}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (userId, token, productId) => {
  return fetch(`${base_route}/product/${productId}/${userId}`, {
    method: "DELETE",
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
