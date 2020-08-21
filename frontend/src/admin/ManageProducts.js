import React, {useEffect} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {getProducts, deleteProduct} from "./helper/adminApiCalls";
import ManageComponent from "./helper/ManageComponent";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const {user, auth_token} = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, auth_token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base>
      <ManageComponent
        item={products}
        _itemName={"products"}
        itemName={"product"}
        deleteFunction={deleteThisProduct}
      />
    </Base>
  );
}
