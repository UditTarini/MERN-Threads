import React, {useEffect} from "react";
import Base from "../core/Base";
import {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {getOrders, deleteOrder, deleteCategory} from "./helper/adminApiCalls";
import ManageComponent from "./helper/ManageComponent";

export default function Orders() {
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const {user, auth_token} = isAuthenticated();

  const preload = () => {
    getOrders(user._id, auth_token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisOrder = (categoryId) => {
    deleteCategory(user._id, auth_token, categoryId).then((data) => {
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
        item={orders}
        _itemName={"ORDERS"}
        itemName={"order"}
        deleteFunction={deleteThisOrder}
      />
    </Base>
  );
}
