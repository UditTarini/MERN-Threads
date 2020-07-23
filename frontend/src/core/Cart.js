import React, {useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import {useState} from "react";
import Base from "./Base";
import {SmallCard, Checkout} from "./Card";
import {loadCartItems} from "./helper/cartHelper";

const Cart = ({product}) => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    setproducts(loadCartItems());
  }, []);

  return (
    <Base>
      <h1 className="heading orange-text">
        You have {products.length} items in your cart{" "}
      </h1>

      <div className="row">
        <div className="col-lg-8">
          {products.map((product, index) => (
            <SmallCard key={index} product={product} />
          ))}
          <p className="text-white mb-0">
            Do not delay the purchase, adding items to your cart does not mean
            booking them.
          </p>
        </div>

        <div className="col-lg-4">
          <Checkout />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
