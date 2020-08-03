import React, {useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import {useState} from "react";
import Base from "./Base";
import {SmallCard} from "./Card";
import {loadCartItems} from "./helper/cartHelper";
import StripePayment from "./StripePayment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  return (
    <Base>
      <h1 className="heading orange-text">
        You have {products.length} items in your cart{" "}
      </h1>

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
          <p className="text-white mb-0">
            Do not delay the purchase, adding items to your cart does not mean
            booking them.
          </p>
        </div>

        <div className="col-lg-4">
          <StripePayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
