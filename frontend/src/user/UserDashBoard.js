import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import {loadPurchsedItems} from "./helper/userApiCalls";
import {SmallCard} from "../core/Components/Card";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [state, setstate] = useState([]);

  useEffect(() => {
    setstate(loadPurchsedItems());
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

  return (
    <Base className="container p-5">
      {userInfo()}

      <h1 className="orange-text my-5">Your purchased items</h1>
      {products.length > 0 ? (
        <div>
          <p className="orange-text ">
            You have purchased {products.length}{" "}
            {products.length > 1 ? "items" : "item"}{" "}
          </p>

          <div className="row">
            <div className="col-lg-8">
              {products.map((product, index) => (
                <SmallCard
                  key={index}
                  product={product}
                  setReload={setReload}
                  reload={reload}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5 className="heading text-secondary ">
          You have not purchased any item yet
        </h5>
      )}
    </Base>
  );
}
