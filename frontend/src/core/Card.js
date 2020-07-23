import React, {useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import {useState} from "react";
import {Redirect} from "react-router-dom";
import {addItemToCart} from "./helper/cartHelper";

export const BigCard = ({product}) => {
  const [redirect, setredirect] = useState(false);

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
      <ImageHelper product={product} />
      {getARedirect(redirect)}
      <p className=" text-wrap">{product.name.slice(0, 25)}...</p>
      <h6>price: {`\u20B9 ${product.price}`}</h6>

      <div className="px-2 m-2">{showAddToCart()}</div>
      <div className="row"></div>
    </div>
  );
};

export const SmallCard = ({product}) => {
  return (
    <section>
      <div>
        <div className="mb-3">
          <div className="pt-4 wish-list">
            <div className="row mb-4">
              <div className="col-md-5 col-lg-3 col-xl-3">
                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <ImageHelper product={product} />
                </div>
              </div>
              <div className="col-md-7 col-lg-9 col-xl-9">
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>{product.name}</h5>
                      {/* <p className="mb-3 text-muted text-uppercase small">
                        Shirt - blue
                      </p>
                      <p className="mb-2 text-muted text-uppercase small">
                        Color: blue
                      </p>
                      <p className="mb-3 text-muted text-uppercase small">
                        Size: M
                      </p> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <button className="btn btn-sm  btn-danger  text-uppercase mr-3">
                        <span className="font-weight-bold Hind">
                          {" "}
                          Remove Item
                          <i className="fa fa-trash ml-2" />{" "}
                        </span>
                      </button>
                    </div>
                    <p className="mb-0">
                      <span>
                        <strong id="summary">{product.price}</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-4 bg-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Checkout = () => {
  return (
    <div>
      {/* Card */}
      <div className="mb-3 ">
        <div className="pt-4 mx-2">
          <h5 className="mb-3">Cart Summary</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Items
              <span>$25.98</span>
            </li>
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Postage & Packing
              <span>$25.98</span>
            </li>
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center border-0 ">
              Tax
              <span>$8.98</span>
            </li>
            <li className="list-group-item d-flex justify-content-between  text-dark align-items-center">
              Shipping
              <span>$40</span>
            </li>
            <li className="list-group-item d-flex justify-content-between  text-dark align-items-center border-0 mb-3">
              <div>
                <strong>The total amount </strong>
              </div>
              <span>
                <strong>$53.98</strong>
              </span>
            </li>
          </ul>
          <button type="button" className="btn orange btn-block">
            Checkout
          </button>
        </div>
      </div>
      {/* Card */}
      {/* Card */}

      {/* Card */}
    </div>
  );
};
