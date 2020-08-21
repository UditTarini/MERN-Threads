import React, {useEffect} from "react";
import Base from "../core/Base";
import {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {getCategories, deleteCategory} from "./helper/adminApiCalls";
import ManageComponent from "./helper/ManageComponent";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const {user, auth_token} = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
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
        item={categories}
        _itemName={"categories"}
        itemName={"category"}
        deleteFunction={deleteThisCategory}
      />
    </Base>
  );
}
