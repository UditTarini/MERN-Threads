import React, {useEffect} from "react";
import "../styles.css";
import Base from "./Base";
import {BigCard} from "./Components/Card";
import {useState} from "react";
import {getProducts} from "./helper/coreApiCalls";
import {MainCarousel} from "./Components/Carousel";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setproducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <div className="row text-center">
        <MainCarousel products={products} />

        <>
          <div className="heading h1 orange-text">Choose your look</div>
          <div className="row">
            {products.map((product, index) => {
              return (
                product.category != "5f4d18bc7072d34b601710ba" && (
                  <div
                    key={index}
                    className="col-xl-2 col-lg-4 col-md-4  col-sm-6 col-6"
                  >
                    <BigCard product={product} />
                  </div>
                )
              );
            })}
          </div>
        </>
      </div>
    </Base>
  );
}
