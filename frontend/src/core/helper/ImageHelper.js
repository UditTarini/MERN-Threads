import React from "react";
import {base_route} from "../../backend";

const ImageHelper = ({product, size}) => {
  const imageurl = product
    ? `${base_route}/product/photo/${product._id}`
    : `https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1700944/2019/6/8/972c9498-3a37-4d5d-976c-4493b4d5c0021559989322793-HRX-by-Hrithik-Roshan-Men-Yellow-Printed-Round-Neck-T-Shirt--1.jpg`;

  return (
    <div className="rounded ">
      <img
        src={imageurl}
        alt="photo"
        style={{maxHeight: size, maxWidth: size}}
        className="mb-1 rounded"
      />
    </div>
  );
};

export default ImageHelper;
