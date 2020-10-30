import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import {loadOrder} from "./helper/userApiCalls";
import {OrderCard} from "../core/Components/Card";
import Loader from "../core/Components/Loader";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().auth_token;

  useEffect(() => {
    loadOrder(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
        setIsLoading(false);
      }
    });
  }, []);

  const {
    user: {name, email, _id},
  } = isAuthenticated();

  const userInfo = () => {
    return (
      <div className="card">
        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <h4 className=" text-center text-white">User Information</h4>
          </li>
          <li className="list-group-item ">
            <span className="badge orange text-white mr-2">Name</span>
            {name}
          </li>
          <li className="list-group-item ">
            <span className="badge orange text-white mr-2">Email</span>
            {email}
          </li>
          <li className="list-group-item ">
            <Link
              to={`/user/${_id}`}
              className="badge badge-warning float-right"
            >
              Update
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const load = () => {
    return isLoading && <Loader />;
  };

  return (
    <Base className="container p-5">
      {userInfo()}

      <h1 className="orange-text my-5">Your orders</h1>
      {load()}
      {orders.length > 0 ? (
        <div>
          <h6 className="text-secondary ">
            You have {orders.length}
            {orders.length > 1 ? " orders" : " order"}{" "}
          </h6>

          <OrderCard orders={orders} />
        </div>
      ) : (
        !isLoading && (
          <h5 className="heading text-secondary ">
            You have not purchased any item yet
          </h5>
        )
      )}
    </Base>
  );
}
