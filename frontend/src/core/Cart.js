import React, {useEffect} from "react";
import {ImageHelper} from "./helper/ImageHelper";
import {useState} from "react";
import Base from "./Base";
import {SmallCard} from "./Components/Card";
import {loadCartItems} from "./helper/cartHelper";
import CartSummary from "./CartSummary";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  return (
    <Base>
      {products.length > 0 ? (
        <div>
          <h1 className="heading orange-text">
            You have {products.length} {products.length > 1 ? "items" : "item"}{" "}
            in your cart
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
                Do not delay the purchase, adding items to your cart does not
                mean booking them.
              </p>
            </div>

            <div className="col-lg-4">
              <CartSummary
                products={products}
                setReload={setReload}
                reload={reload}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="heading orange-text text-center">
          You have no items in your cart
        </h1>
      )}
    </Base>
  );
};

export default Cart;
