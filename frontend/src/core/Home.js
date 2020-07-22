import React, {useEffect} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {useState} from "react";
import {getProducts} from "./helper/coreApiCalls";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        console.log(data);
        setproducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="heading orange-text">Choose your look</h1>
        <div className="row">
          {products.map((products, index) => {
            return (
              <div key={index} className="col-2">
                <Card product={products} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
