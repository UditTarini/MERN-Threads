import React, {useEffect} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {useState} from "react";
import {isAuthenticated} from "../auth/helper";
import {getProducts, deleteProduct} from "./helper/adminApiCalls";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const {user, auth_token} = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, auth_token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 ">
          <div className="bg-dark p-4">
            <h3 className="py-3">Total {products.length} products </h3>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <h5 className="text-white font-weight-light text-left ">
                      Name
                    </h5>
                  </div>
                  <div className="col-8">
                    <h5 className="text-white font-weight-light text-center ">
                      Action
                    </h5>
                  </div>
                </div>
                <hr className="bg-secondary" />
                {products.map((item, index) => (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3
                        className="text-white text-left"
                        style={{fontFamily: "Alegreya Sans", fontSize: 20}}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${item._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => deleteThisProduct(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
