import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {CarouselImageHelper} from "../helper/ImageHelper";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {addItemToCart} from "../helper/cartHelper";

export const MainCarousel = ({products}) => {
  return (
    <>
      {products.length && (
        <OwlCarousel className="owl-theme " loop autoplay items={1}>
          {products.map((product, index) => {
            return (
              product.category == "5f4d18bc7072d34b601710ba" && (
                <div index={index} className="item card baseColor">
                  <div className="row">
                    <div className="col-md-5 text-center align-slef-center">
                      <CarouselImageHelper product={product} />
                    </div>
                    <div className="col-md-7 info">
                      <div className="row title mb-2">
                        <div className="col-md-10 col-12">
                          <h1 className="Hind">{product.name}</h1>
                          <p>{product.description.slice(0, 200)}...</p>

                          <div>
                            <i
                              class="fa fa-star fa-2x full_star"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star fa-2x full_star"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star fa-2x full_star"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star fa-2x full_star"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star-half fa-2x full_star"
                              aria-hidden="true"
                            ></i>
                            <p class="text-secondary">4580 Review</p>
                          </div>

                          <div>
                            <sup className="h5"> {"\u20B9"}</sup>
                            <span className="h1 Merriweather">
                              {product.price} Only
                            </span>
                          </div>
                          <Link to="/cart">
                            <button
                              onClick={() => addItemToCart(product, () => {})}
                              className="btn  btn-lg my-5 btn-outline-warning "
                            >
                              Add to Cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </OwlCarousel>
      )}
    </>
  );
};
