import React from "react";
import {Link} from "react-router-dom";

export default function ManageComponent({
  item,
  _itemName,
  itemName,
  deleteFunction,
}) {
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 ">
        <div className="bg-dark p-4">
          <h3 className="py-3">
            TOTAL {item.length} {_itemName}{" "}
          </h3>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-4">
                  <h5 className="text-white font-weight-light text-left ">
                    {itemName == "order" ? "ID" : "NAME"}
                  </h5>
                </div>
                <div className="col-8">
                  <h5 className="text-white font-weight-light text-center ">
                    ACTION
                  </h5>
                </div>
              </div>
              <hr className="bg-secondary" />
              {item.map((value, index) => (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3
                      className="text-white text-left"
                      style={{fontFamily: "Alegreya Sans", fontSize: 20}}
                    >
                      {itemName == "order" ? value._id : value.name}
                    </h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/${itemName}/update/${value._id}`}
                    >
                      <span className="">UPDATE</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => deleteFunction(value._id)}
                      className="btn btn-danger"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
