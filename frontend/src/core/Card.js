import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({product, addToCart = true, removeFromCart = false}) => {
  const showAddToCart = (addToCart) =>
    addToCart && (
      <div className="col-12">
        <button
          onClick={() => {}}
          className="btn btn-sm  btn-outline-success  "
        >
          Add to Cart
        </button>
      </div>
    );
  const showRemoveFromCart = (removeFromCart) =>
    removeFromCart && (
      <div className="col-12">
        <button
          onClick={() => {}}
          className="btn btn-outline-danger btn-block  "
        >
          Remove from cart
        </button>
      </div>
    );
  return (
    <div className="card  bg-dark my-4">
      <ImageHelper product={product} />

      <p className=" text-wrap">{product.name.slice(0, 25)}...</p>
      <h6>price: {`\u20B9 ${product.price}`}</h6>

      <div className="px-2 m-2">
        {showAddToCart(addToCart)}
        {showRemoveFromCart(removeFromCart)}
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Card;
