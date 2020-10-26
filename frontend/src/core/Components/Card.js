import React, {useEffect} from "react";
import {ImageHelper} from "../helper/ImageHelper";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import {useState} from "react";
import {Redirect} from "react-router-dom";
import {addItemToCart, removeCartItems} from "../helper/cartHelper";
import {useWindowDimensions} from "../helper/utils";

export const BigCard = ({product}) => {
  const [redirect, setredirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const _addToCart = () => {
    addItemToCart(product, () => setredirect(true));
  };
  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = () => (
    <div className="col-12">
      <button
        onClick={_addToCart}
        className="btn btn-sm  btn-outline-success  "
      >
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="card  bg-dark my-4">
      <ImageHelper product={product} size={"100%"} />
      {getARedirect(redirect)}
      <p className="text-wrap h-1">{product.name.slice(0, 15)}...</p>
      <h6>price: {`\u20B9 ${product.price}`}</h6>

      <div className="px-2 m-2">{showAddToCart()}</div>
      <div className="row"></div>
    </div>
  );
};

export const SmallCard = ({
  product,
  reload = undefined,
  setReload = (param) => param,
}) => {
  const {height, width} = useWindowDimensions();
  return (
    <section>
      <div className="pt-2">
        <div className="row">
          <div className="col-md-5 col-lg-3 col-xl-3 col-3">
            <ImageHelper
              product={product}
              size={width < 600 ? "100%" : "50%"}
            />
          </div>
          <div className="col-md-7 col-lg-9 col-xl-9 col-9">
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{product.name}</h5>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-sm  btn-danger  text-uppercase mr-3"
                  onClick={() => {
                    removeCartItems(product._id);
                    setReload(!reload);
                  }}
                >
                  <span className="font-weight-bold Hind ">
                    {" "}
                    Remove Item
                    <i className="fa fa-trash ml-2" />{" "}
                  </span>
                </button>

                <p className="mb-0">
                  <span>
                    <strong id="summary">{`\u20B9 ${product.price}`}</strong>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-secondary" />
      </div>
    </section>
  );
};

export const OrderCard = ({orders}) => {
  const {height, width} = useWindowDimensions();
  const dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      {orders.map((order, index) => (
        <div className="card  mt-2" key={index}>
          <ul className="list-group">
            <li className="list-group-item order-info">
              <h6 className="text-dark">
                {new Date(order.createdAt).toLocaleDateString(
                  "en-US",
                  dateFormat
                )}
              </h6>
              <h6 className="ml-4 text-dark">Total: {order.amount}</h6>
              <h6 className="ml-4 text-dark">
                Transaction Id: {order.transaction_id}
              </h6>

              <h6 className="ml-4 text-dark">Order Id: {order._id}</h6>
            </li>

            {/* product */}

            <li className="list-group-item">
              <section>
                {order.products.map((product, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col-md-3 col-lg-3 col-xl-3 col-4">
                        <ImageHelper
                          product={product}
                          size={width < 600 ? "100%" : "50%"}
                        />
                      </div>

                      <div className="col-md-9 col-lg-9 col-xl-9 col-8">
                        <div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5>{product.name}</h5>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="text-dark">
                                Status:{" "}
                                <span className="bold text-success">
                                  {" "}
                                  {order.status}
                                </span>
                              </h6>
                            </div>
                            <p className="mb-0">
                              <span>
                                <strong id="summary">{`\u20B9 ${product.price}`}</strong>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index === order.products.length - 1 ? null : <hr />}
                  </div>
                ))}
              </section>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};
